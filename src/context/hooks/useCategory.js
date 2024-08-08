import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useCategory() {
  const [categories, setCategories] = useState([]);
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong In getting Category");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  return categories;
}
