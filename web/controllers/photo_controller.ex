defmodule Example.PhotoController do
  use Example.Web, :controller

  import Example.Utils
  import RethinkDB.Query, only: [table: 1, insert: 2]

  alias RethinkDB.Query
  alias Example.Database
  alias Example.Photo

  plug :scrub_params, "photo" when action in [:create, :update]

  def index(conn, _params) do
    photos = Query.table("photos")
    |> Database.run
    json(conn, %{photos: photos.data})
  end

  def show(conn, %{"id" => id}) do
    photo = Query.table("photos")
    |> Query.get(id)
    |> Database.run
    json(conn, %{photo: photo.data})
  end

  def create(conn, photo) do
    %{"photo" => photo_params} = photo
    resp = Query.table("photos")
    |> Query.insert(photo_params)
    |> Database.run
    id = resp.data["generated_keys"] |> hd
    photo = put_in(photo, ["photo", "id"], id)
    send_resp(conn, :created, encode_json(photo))
  end

  def update(conn, data) do
    %{"id" => id, "photo" => photo_params} = data
    resp = Query.table("photos")
    |> Query.get(id)
    |> Query.update(photo_params)
    |> Database.run
    send_resp(conn, :accepted, encode_json(data))
  end

  def delete(conn, %{"id" => id}) do
    resp = Query.table("photos")
    |> Query.get(id)
    |> Query.delete
    |> Database.run
    send_resp(conn, :no_content, "")
  end

  def options(conn, _params) do
    conn
    |> put_status(200)
    |> text(nil)
  end

  # %{id: id, author: author} = photo_params
  # def create(conn, %{"photo" => %{id: id, author: author}}) when is_bitstring author && when is_number id do
  # end

  # def create(conn, _) do
  #   :error
  # end

  # defp extract_data(params) do
  #   %{id: id, author: author} = params["photo"]
  # end

  # json conn, %{id: 1234}
  # put_status(conn, :created)
  # put_resp_header("location", photo_path(conn, :show, photo))

end
