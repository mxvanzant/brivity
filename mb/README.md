# README

* Message Board
A simple message board app.

* ruby and rails and node
I started out with Rails 7 but there were issues with devise -- fought with that for a long time and finally started over with Rails 6.1...

I'm using Ruby 3.1.x and Rails 6.1.x (see Gemfile and .tool-versions for specifics)

I had to downgrade my node version because it was breaking things related to packer/webpack: something about an empty manifest-- can't remember now exactly what it was..
So, I ended up going to node 16.13.1 and that worked.

Then I cleaned up by doing:
rails assets:clobber
yarn
rails assets:precompile

* status

Then I got devise working ok. (Note: They changed their users/sign_out to require an HTTP delete, but I reverted in the devise.rb config to using a get.)

Got the message posts working, etc.

Did not get to commenting or any tests yet..

* mailslurper

I've included mailslurper you can run to handle receiving any confirmation emails from devise for user sign ups.
(see it's config.json for any changes (ports, etc) you want to make, then run mailslurper -- it's got a nice web interface (hit refresh) to view the sent emails)

* asdf
I used the asdf package manager to install Ruby, Rails, Node, etc. versions. Asdf uses the .tool-versions file.

* css I copied into public/mb.css
This came from unixsheikh.com Cool blog -- check it out! :)

* public/ajax.js
This is something I had previously written -- though I might need to use it (maybe for the devise users/sign_out which required a delete), but ended up not needing it.

* Postgresql
I used postgres -- see database.yml and configure to your liking for your own pg instance..
