import { useContext, useEffect, useState } from "react";
import { StepperContext } from "../StepperContext";
import { FadeLoader } from "react-spinners";

const initialIdentification = {
  title: "",
  authors_list: "",
  year: "",
  doi: "",
  journal: "",
  link: "",
  contributor: "",
  contributor_email: "",
  save_draft: true
}

const Identification = ({ autofillLoader }) => {
  const { contributionData, updateContributionData } = useContext(StepperContext);

  const [formData, setFormData] = useState( contributionData?.identification || initialIdentification);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      ...contributionData.identification,
    }));
  }, [contributionData.identification]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      ...(name === "doi" && { link: `https://doi.org/${value}` }), 
    }));
    
    updateContributionData("identification", {
      ...contributionData.identification,
      [name]: value,
      ...(name === "doi" && { link: `https://doi.org/${value}` }), 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-[500px] bg-white/50 rounded-lg border">
      <h1 className="bg-primary/80 rounded-t-lg p-1 px-3 text-white text-[16px]">
        Identification
      </h1>
      {autofillLoader && <div className="flex flex-1 justify-center my-2"><FadeLoader color="#4169E1" /></div>}
      <form
        onSubmit={handleSubmit}
        className="p-2 sm:p-7 mx-auto flex flex-col gap-4"
      >
        <div className="w-full">
          <label htmlFor="title" className="block text-sm font-medium text-gray-900" > Research Title </label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={handleChange}
            value={formData.title}
            className="rounded-md text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary"
            placeholder="Battery Materials Design Essentials"
            required
          />
        </div>

        <div className="w-full">
          <label htmlFor="authors_list" className="block text-sm font-medium text-gray-900"> Authors List </label>
          <input
            type="text"
            name="authors_list"
            id="authors_list"
            onChange={handleChange}
            value={formData.authors_list}
            className="rounded-md text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary"
            placeholder="M. Rosa Palacin, Jacksmith, John Doe"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="w-full">
            <label htmlFor="year" className="block text-sm font-medium text-gray-900" > Year </label>
            <input
              type="text"
              name="year"
              id="year"
              min="1900"
              max={new Date().getFullYear()} 
              onChange={handleChange}
              value={formData.year}
              className="rounded-md text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary"
              placeholder="2021"
              required
            />
          </div>
          <div className="w-full">
            <label htmlFor="doi" className="block text-sm font-medium text-gray-900" > DOI </label>
            <input
              type="text"
              name="doi"
              id="doi"
              onChange={handleChange}
              value={formData.doi}
              className="rounded-md text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary"
              placeholder="10.1021/accountsmr.1c00026"
              required
            />
            {formData.doi && ( <a href={formData.link} target="_blank" rel="noopener noreferrer" className="text-primary italic text-[10px] hover:underline" > {formData.link} </a> )}
          </div>
        </div>

        <div className="w-full">
          <label htmlFor="journal" className="block text-sm font-medium text-gray-900" > Journal Published </label>
          <input
            type="text"
            name="journal"
            id="journal"
            onChange={handleChange}
            value={formData.journal}
            className="rounded-md text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary"
            placeholder="Accounts of Materials Research - American Chemical Society (ACS)"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="w-full">
            <label htmlFor="contributor_email" className="block text-sm font-medium text-gray-900" > Contributor Email </label>
            <input
              type="email"
              name="contributor_email"
              id="contributor_email"
              onChange={handleChange}
              value={formData.contributor_email}
              className="rounded-md text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary"
              placeholder="john@doe.com"
            />
          </div>
          <div className="w-full">
            <label htmlFor="contributor" className="block text-sm font-medium text-gray-900" > Contributor Name </label>
            <input
              type="text"
              name="contributor"
              id="contributor"
              onChange={handleChange}
              value={formData.contributor}
              className="rounded-md text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary"
              placeholder="John Doe"
              required
            />
          </div>
        </div>

        <div className="flex justify-end">
          <div className="relative group">
            <input
              type="checkbox"
              name="save_draft"
              id="save_draft"
              className="hover:scale-105 checked:accent-primary mr-2 mt-2 w-4 h-4 size-3"
              checked={formData.save_draft}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  save_draft: e.target.checked,
                }))
              }
            />
            <label htmlFor="save_draft" className="italic">Save draft & Continue</label>
            <div className="absolute top-1/2 left-0 transform -translate-x-full -translate-y-1/2 px-2 py-1 text-[12px] text-white bg-gray-500 rounded shadow-lg opacity-0 group-hover:opacity-100"> 
              It will save the contribution in the browser for future
              and allow you to continue editing it later.
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Identification;
