class PostsController < ApplicationController
  #skip_before_action :authenticate_user!, only: [:index, :show], raise: false

  before_action :my_before_action

  def index
    #@posts = Post.all
    @posts = Post.order("created_at desc")
  end

  def show
    @post = Post.find(params[:id])
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.new(post_params.merge({user_id: current_user.id}))

    if @post.save
      redirect_to @post
    else
      render :new
    end
  end

  def edit
    @post = Post.find(params[:id])
  end

  def update
    @post = Post.find(params[:id])

    if @post.update(post_params)
      redirect_to @post
    else
      render :edit
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :body)
  end

  def my_before_action
    puts "action_name: #{action_name}, class: #{action_name.class}"
    unless current_user
      redirect_to "/users/sign_in" unless action_name == "index" || action_name == "show"
    end
  end
end
