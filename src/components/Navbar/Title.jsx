import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Title mappings for paths
const titleMap = {
  "/smart-pchart-spc-avi": "Template Typescript",
  "/smart-pchart-spc-avi/homepage": "Template Typescript",
  "/smart-pchart-spc-avi/spc_avi_chart": "SPC AVI",
  "/smart-pchart-spc-avi/out_of_rule_action": "OUT OF RULES ACTION",
  "/smart-pchart-spc-avi/master_ucl_lcl": "MASTER UCL LCL",
};

function Title() {
  const location = useLocation();
  const [title, setTitle] = useState("");

  useEffect(() => {
    // Update title based on the current path
    setTitle(titleMap[location.pathname]);
  }, [location]);

  return <a className="font-semibold  mx-4">{title}</a>;
}

export default Title;
