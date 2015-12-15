defmodule Example.PhotoControllerTest do
  use Example.ConnCase

  alias Example.Photo
  @valid_attrs %{}
  @invalid_attrs %{}

  setup do
    conn = conn() |> put_req_header("accept", "application/json")
    {:ok, conn: conn}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, photo_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    photo = Repo.insert! %Photo{}
    conn = get conn, photo_path(conn, :show, photo)
    assert json_response(conn, 200)["data"] == %{"id" => photo.id}
  end

  test "does not show resource and instead throw error when id is nonexistent", %{conn: conn} do
    assert_raise Ecto.NoResultsError, fn ->
      get conn, photo_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, photo_path(conn, :create), photo: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Photo, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, photo_path(conn, :create), photo: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    photo = Repo.insert! %Photo{}
    conn = put conn, photo_path(conn, :update, photo), photo: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Photo, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    photo = Repo.insert! %Photo{}
    conn = put conn, photo_path(conn, :update, photo), photo: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    photo = Repo.insert! %Photo{}
    conn = delete conn, photo_path(conn, :delete, photo)
    assert response(conn, 204)
    refute Repo.get(Photo, photo.id)
  end
end
