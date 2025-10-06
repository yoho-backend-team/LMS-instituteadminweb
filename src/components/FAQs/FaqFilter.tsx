/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { Label } from "../..//components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { GetLocalStorage } from "../../utils/localStorage";
import { fetchFaqCategoryThunk } from "../../features/Faq_Category/thunks";


export function FAQFilter({ setCat, setSearch, inputData }: {
  setSearch: (data: string) => void;
  setCat: (data: string) => void;
  inputData: string;
}) {

  const category = useSelector((state: RootState) => state.faqCategory.data)
  const dispatch = useDispatch<AppDispatch>()

  console.log(category, "check all category")

  useEffect(() => {
    (async () => {
      const params = {
        branchid: GetLocalStorage("selectedBranchId"),
        instituteid: GetLocalStorage("instituteId"),
      };
      dispatch(fetchFaqCategoryThunk(params))
    })()
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-white shadow border-1 p-5 rounded-xl">
      <div>
        <Label
          htmlFor="search-faqs"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Search FAQs
        </Label>
        <input type="text" placeholder="Enter words to search"
          value={inputData}
          onChange={(e) => { e.preventDefault(); setSearch(e.target.value) }}
          className="border w-full h-9 rounded-md p-2" />
      </div>
      <div>
        <Label
          htmlFor="filter-category"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Filter Category
        </Label>
        <Select onValueChange={(v) => setCat(v)}>
          <SelectTrigger id="filter-category" className="w-full">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {
              category?.map((item: any, index) => (
                <SelectItem key={index} value={item?._id}>{item?.category_name}</SelectItem>
              ))
            }
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
