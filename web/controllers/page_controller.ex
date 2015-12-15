defmodule Example.PageController do
  use Example.Web, :controller
  import RethinkDB.Query, only: [table_create: 1, table: 2, table: 1, insert: 2]
  #import RethinkDB.Query, except: [json: 2]

  # fetch all posts and return them as JSON
  def thing(conn, _params) do
    results = table("photos")
    |> Example.Database.run
    |> IO.inspect

    json conn, results
  end

  def index(conn, _params) do
    render conn, "index.html"
  end

end
