import api from "./api"

//Get all menu items
export const getMenuItems = async () => {
    const response = await api.get("/MenuItems")
    console.log(response)

    const convertDriveUrl = (url) => {
      if(!url.includes('drive.google.com')) return url

      const id = url.split('/d/')[1]?.split('/')[0]

      return `https://drive.usercontent.google.com/uc?id=${id}`
    }

const normalizedData = response.data.map(item => ({
    menuId: item.menuId,
    name: item.name ?? item.title,
    price: Number(item.price),
    imageUrl: convertDriveUrl(item.imageUrl),
    variants: item.variants
  }))

  return normalizedData
}