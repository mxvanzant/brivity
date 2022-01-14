// module ajax
"use strict"

//////////////////////////// exported //////////////////////////////////////////

function ajax({url, method, success=null, data=null, error=null, files=null, type='json', content_type=null, credentials=null}){
	let headers = {}
	headers = _hctype(headers, content_type, files)
	if(credentials){
		headers = _hauth(headers, credentials.user_name, credentials.password)
	}
	let body = _body(data, files)
	let init = {
		method: method,
		headers: headers
	}
	if(body){
		init['body'] = body
	}
	let error_handler = _error_handler(error)
	let success_handler = _success_handler(success)
	// use fetch
	fetch(url, init).then(response => {
		if(response.ok)
			success_handler(response)
		else
			error_handler(response)
	})
}

function del({url, success=null, error=null, credentials=null}){
	ajax({url, method: 'DELETE', success, error, credentials})
}

function get({url, success=null, error=null, credentials=null}){
	ajax({url, method: 'GET', success, error, credentials})
}

function make_standard_error_handler_with_additional_action(on_error_action=null){
	let eh = (response => {
		console.log(`ajax: error: url: ${response.url}.`)
		if(on_error_action){
			on_error_action(response)
		}
		_show_failure(response)
	})
	return eh
}

function post({url, data, success=null, error=null, files=null, credentials=null}){
	ajax({url, method: 'POST', success, data, error, files, credentials})
}

function put({url, data, success=null, error=null, files=null, credentials=null}){
	ajax({url, method: 'PUT', success, data, error, files, credentials})
}

///////////////////////////// private //////////////////////////////////////////

function _body(data, files){
	let ret = null

	if(files && files.length > 0){
		let temp = null
		//# content_type = "multipart/form-data"
		//content_type = false
		temp = new FormData()
		for(const file of files){
			temp.append(file[0], file[1])
		}
		if(data){
			for (var i = 0, keys = Object.keys(data), l = keys.length; i < l; i++) {
				temp.append(keys[i],data[keys[i]])
			}
		}
		ret = JSON.stringify(temp)
	}
	else if(data){
		ret = JSON.stringify(data)
	}
	return ret
}

function _content_type(files, content_type=null){
	if(content_type)
		return content_type
	if(files && files.length > 0)
		return false
	else
		return "application/json"
}

function _error_handler(handler){
	let eh = null
	if(handler === undefined || handler === null)
		eh = (response => {
			console.log(`ajax: error: url: ${response.url}.`)
			_show_failure(response)
		})
	else
		eh = handler
	return eh
}

function _file_upload_data(data, files){
	let json_data = null
	if(files && files.length > 0){
		//# content_type = "multipart/form-data"
		//content_type = false
		json_data = new FormData()
		for(const file of files)
			json_data.append(file[0], file[1])
		if(data)
			for (var i = 0, keys = Object.keys(data), l = keys.length; i < l; i++)
				json_data.append(keys[i],data[keys[i]])
	}
	return json_data
}

function _hauth(headers, uname, pw){
	if(uname){
		let auth = window.btoa(`${uname}:${pw}`)
		headers['Authorization'] = `Basic ${auth}`
	}
	return headers
}

function _hctype(headers, content_type, files){
	if(content_type){
		headers['Content-Type'] = content_type
	}
	else if(files && files.length > 0){
		//none
	}
	else{
		headers['Content-Type'] = 'application/json'
	}
	return headers
}

function _json_data(data, files){
	let json_data = null
	json_data = _file_upload_data(data, files)
	if(json_data === null)
		if(data)
			json_data = JSON.stringify(data)
	return json_data
}

function _show_failure(response){
	let status = response.status
	let status_text = response.statusText
	response.text().then(response_text => {
		let text = `${status}\n\n${status_text}\n\n${response_text}`
		window.alert(`ajax call failure: ${text}.`)
	})
}

function _success_handler(handler){
	let h = null
	if(handler === undefined || handler === null)
		h = (response => {
			console.log(`ajax: success: url: ${response.url}.`)
			window.alert(`success callback function was null in call to url: ${response.url}.`)
		})
	else
		h = handler
	return h
}

export {
	ajax,
	get,
	post,
	put,
	del,
	make_standard_error_handler_with_additional_action
}
