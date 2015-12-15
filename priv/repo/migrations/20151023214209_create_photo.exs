defmodule Example.Repo.Migrations.CreatePhoto do
  use Ecto.Migration

  def change do
    create table(:photos) do

      timestamps
    end

  end
end
