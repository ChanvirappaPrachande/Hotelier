import toast from "react-hot-toast";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    throw new Error("cabin could not be deleted");
  }
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath =
    typeof newCabin.image === "string" &&
    newCabin.image.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  //https://xbhxdqwcajlmybkazgku.supabase.co/storage/v1/object/public/cabin-images/cabin-002.jpg
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  let query = supabase.from("cabins");
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be added");
  }

  //uplad file
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //dlete if storage error
  if (storageError) {
    await supabase.storage.from("cabins").delete().eq(data.id);
    toast.error("Cabin image was not uploaded, so the cabin was not cerated");
  }
  return data;
}
