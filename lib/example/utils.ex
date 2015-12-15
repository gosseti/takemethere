defmodule Example.Utils do

  import Example.Random

  def encode_json(data) do
    Poison.Encoder.encode(data, [])
  end

  def uri_builder(term, query) do
    built_url = URI.encode_query(query)
      |> URI.decode()
      |> uri_concat(term)
  end

  def uri_concat(query, term) do
    term <> query
  end

  def build_query(lat, lng) do
    term = "geo=#{lat},#{lng},25km&"
    query = %{
      rpp: "20",
      image_size: "3",
      tags: "true",
      sort: "votes_count",
      consumer_key: "dlhZ5Brb4VIuPdwssI0fFHuh45j9TqUjcCcH9cGo"
    }
    uri_builder(term, query)
  end

end
