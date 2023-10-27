import { listAll, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { ProductProps } from "../components/Product";

const listFiles = async () => {
  const storageRef = ref(storage, "/");

  const { items } = await listAll(storageRef);

  const urlsPromises = items.map(async (it) => {
    const url = await getDownloadURL(it);
    return url;
  });

  const imgs = await Promise.all(urlsPromises);

  return imgs;
};

function getRandomPrice() {
  return Math.floor(Math.random() * 34) + 12;
}

function getTitleFromUrl(url: string) {
  const parts = url.split("-");
  const titleParts = [];

  for (let i = 0; i < parts.length; i++) {
    if (parts[i] === parts[i].toUpperCase()) {
      titleParts.push(parts[i]);
    } else {
      titleParts.push(
        parts[i].charAt(0).toUpperCase() + parts[i].slice(1).toLowerCase()
      );
    }
  }

  let finalTitle = titleParts.join(" ");

  finalTitle = finalTitle.replace(
    "Coffee Beans Shop Australia Order Online Best Seller",
    ""
  );

  return finalTitle.trim();
}

export const fetchFiles = async () => {
  const urls = await listFiles();
  const coffeeObjects = await Promise.all(
    urls.map(async function (url, index) {
      const treatedUrl =
        url.split("/").pop()?.split("-").slice(0, -1).join("-") ?? "Coffee";

      return {
        price: getRandomPrice(),
        type: "coffee",
        title: getTitleFromUrl(treatedUrl ? treatedUrl : "Coffee"),
        image: url,
        id: index + 1
      };
    })
  );
  return coffeeObjects as ProductProps[];
};
