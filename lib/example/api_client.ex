defmodule Example.ApiClient do
  #use HTTPoison.Base

  @expected_fields ~w(
    aperture camera category collections_count comments_count converted
    converted_bits created_at crop_version description favorites_count
    focal_length for_sale for_sale_date height hi_res_uploaded highest_rating
    highest_rating_date id image_format image_url images iso latitude lens
    license_type licensing_requested location longitude name nsfw
    positive_votes_count privacy rating sales_count shutter_speed status
    taken_at times_viewed url user user_id votes_count watermark width
  )

  def process_url(url) do
    "https://api.500px.com/v1/photos/search?" <> url
  end

  # def process_response() do
  #   IO.puts body
  #   IO.puts "200"
  # end
  #
  # def process_response(body) do
  #   IO.puts body
  #   IO.puts "400"
  # end

  def get!(url) do
    url = "https://api.500px.com/v1/photos/search?" <> url
    response = HTTPoison.get(url)
    IO.inspect response
    case response do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        body |> Poison.decode!
      {:ok, %HTTPoison.Response{status_code: 404}} ->
        %{status: 404} |> Poison.decode!
      {:error, %HTTPoison.Error{reason: reason}} ->
        %{status: 500} |> Poison.decode!
    end
  end

    # process_response(resp)
    # case body do
    #   {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
    #     Poison.decode!
    #     IO.inspect
    #   {:ok, %HTTPoison.Response{status_code: 404}} ->
    #     IO.puts "Not found :("
    #   {:error, %HTTPoison.Error{reason: reason}} ->
    #     IO.inspect reason
    # end

  # def process_response_body(conn, %{status_code: 404}) do
  #   IO.puts "Not found :("
  #   conn |> put_status(404)
  # end
  #
  # def process_response_body(conn, %{reason: reason}) do
  #   IO.inspect reason
  # end

  # def process_response_body(body) do
  #   resp = body
  #     |> Poison.decode!
  #
  #   if resp["status"] = 200
  #
  #   else
  #     resp["photos"]
  #   end
  #
  #   # |> Dict.take(@expected_fields)
  #     |> IO.inspect
  #   # |> Enum.map(fn({k, v}) -> {String.to_atom(k), v} end)
  # end

end
