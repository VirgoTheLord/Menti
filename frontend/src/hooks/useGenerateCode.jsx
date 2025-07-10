import axios from "axios";
import React, { useState } from "react";

const useGenerateCode = () => {
  const [code, setCode] = useState("");
  const handleGenerateCode = async () => {
    try {
      const response = await axios.get(
        "http://139.59.55.164/api/generate-code"
      );
      if (response.status === 200) {
        const code = response.data.code;
        setCode(code);
        console.log(`Generated quiz code: ${code}`);
      } else {
        console.error("Failed to generate quiz code");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return {
    code,
    setCode,
    handleGenerateCode,
  };
};

export default useGenerateCode;
