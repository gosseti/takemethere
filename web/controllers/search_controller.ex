defmodule Example.SearchController do
  use Example.Web, :controller

  import Example.Utils
  import RethinkDB.Query, only: [table: 1, insert: 2]
  import Example.Random

  alias Example.ApiClient, as: ApiClient
  alias RethinkDB.Query
  alias Example.Database
  alias Example.Photo

  def new(conn, %{"lat" => lat, "lng" => lng}) do
    built_uri = build_query(lat, lng)

    {result, processed} = ApiClient.get!(built_uri) |> __MODULE__.process_response

    case result do
      :ok ->
        processed
        |> Enum.shuffle
        |> Enum.map(&save_photo/1)
        conn |> put_status(200) |> text(nil)
      _ ->
        conn |> put_status(405) |> text(nil)
    end

  end

  def new(conn, _params) do
    conn |> put_status(200) |> text(nil)
  end

  defp save_photo(photo) do
    filtered_photo = Dict.drop(photo, ["id"])
    Query.table("photos")
      |> Query.insert(filtered_photo)
      |> Database.run
      |> IO.inspect
  end

  def process_response(data) do
    case Map.keys(data) do
      [] ->
        {:error, :empty}
      _  ->
        {:ok, data["photos"]}
    end
  end
end
