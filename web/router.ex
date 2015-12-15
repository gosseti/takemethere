defmodule Example.Router do
  use Example.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug PlugCors, [origins: ["localhost:4200"]]
  end

  scope "/", Example do
    pipe_through :api

    get "/", PageController, :index

    resources "/search", SearchController, only: [:new]
    resources "/photos", PhotoController

    options "/photos*anything", PhotoController, :options
  end

end
