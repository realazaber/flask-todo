"use strict";

import React from "react";

type Props = {};

const currentDate = new Date().getFullYear();

const Footer = (props: Props) => {
  return (
    <footer className="bg-pri text-sec text-center py-3 mt-auto">
      Created by Azaber {currentDate}
    </footer>
  );
};

export default Footer;
