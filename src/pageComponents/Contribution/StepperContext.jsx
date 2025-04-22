// StepperContext.js
import { createContext, useEffect, useState } from "react";
import { useGetprofileQuery } from "../../services/Setting";

export const StepperContext = createContext(null);

export const StepperProvider = ({ children }) => {
  const { data: profile, isLoading: loadingProfile, isError: errorProfile } = useGetprofileQuery();

  const [contributionData, setContributionData] = useState({
    identification: {
      title: "",
      authors_list: "",
      year: "",
      doi: "",
      journal: "",
      link: "",
      contributor: "",
      contributor_email: "",
      save_draft: true
    },
    enteries: [],
    isSubmitted: false,
  });

  const updateContributionData = (section, newData) => {
    setContributionData((prevData) => ({
      ...prevData,
      [section]: Array.isArray(prevData[section])
        ? newData 
        : { ...prevData[section], ...newData }, 
    }));
  };

  
  const resetContributionData = () => {
    setContributionData({
      identification: {
        title: "",
        author_list: "",
        year: "",
        doi: "",
        journal: "",
        link: "",
        contributor: profile?.message?.full_name || "",
        contributor_email: profile?.message?.email || "",
      },
      enteries: [],
      isSubmitted: false,
    });
  };

  useEffect(() => {
    if (profile?.message) {
      setContributionData((prevData) => ({
        ...prevData,
        identification: {
          ...prevData.identification,
          contributor: profile.message.full_name || "",
          contributor_email: profile.message.email || "",
        },
      }));
    }
  }, [profile]);

  // Index of selected materialProcessing entry (for editing)
  const [matproIndex, setMatproIndex] = useState(null);
  const [testcellIndex, setTestcellIndex] = useState(null);

  return (
    <StepperContext.Provider
      value={{
        contributionData,
        setContributionData,
        updateContributionData,
        resetContributionData,
        matproIndex,
        setMatproIndex,
        testcellIndex,
        setTestcellIndex
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};
