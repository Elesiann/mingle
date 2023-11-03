import { getDownloadURL, listAll, ref } from "firebase/storage";
import { indexOf } from "lodash";
import { storage } from "../firebase";
import { ProductDTO } from "../types/Product";

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

const listEquipment = async () => {
  const storageRef = ref(storage, "/equipment");

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

export const fetchEquipment = async () => {
  const urls = await listEquipment();
  const equipmentObject = await Promise.all(
    urls.map(async function (url, index) {
      return {
        id: index + 1,
        title: "equipamento",
        price: Math.floor(Math.random() * 100) + 17,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: url,
        discount: 0,
        category: "coffee",
        type: "equipment",
        createdAt: new Date(),
        updatedAt: new Date()
      };
    })
  );
  return equipmentObject;
};

export const fetchFiles = async () => {
  const urls = await listFiles();
  const coffeeObjects = await Promise.all(
    urls.map(async function (url, index) {
      const treatedUrl =
        url.split("/").pop()?.split("-").slice(0, -1).join("-") ?? "Coffee";

      // gets only the string before file extension
      const fileName = treatedUrl.substring(0, indexOf(treatedUrl, "."));

      return {
        id: index + 1,
        title: getTitleFromUrl(treatedUrl ? fileName : "Coffee"),
        price: getRandomPrice(),
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: url,
        discount: 0,
        category: "coffee",
        type: "coffee",
        createdAt: new Date(),
        updatedAt: new Date()
      };
    })
  );

  return coffeeObjects as ProductDTO[];
};
