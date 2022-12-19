export async function fetchImages(animal,count) {
    const response = await fetch(
      `http://shibe.online/api/${animal}?count=5&urls=true&httpsUrls=true`
    );
    const data = await response.json();
    return data;
  }