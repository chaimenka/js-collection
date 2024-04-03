import supabase, { URL } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(URL);


  // create image name and path
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath? newCabin.image: `${URL}/storage/v1/object/public/cabin-images/${imageName}`;

  // create/edit query
  let query = supabase.from("cabins");

  // create new cabin
  if (!id) {
    query = query
      .from("cabins")
      .insert([{ ...newCabin, image: imagePath }]);
  }

  // edit cabin
  if (id) {
    query = query
      .from("cabins")
      .update({ ...newCabin, image: imagePath })
      .eq("id", id);
  }

  // edit cabin and select the cabin
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // delete cabin if image upload fails
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Cabin image could not be uploaded");
  }

  return data;
}
