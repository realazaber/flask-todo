"use strict";

import React from "react";

type Props = {};

const currentDate = new Date().getFullYear();

const Footer = (props: Props) => {
  return (
    <footer className="bg-pri text-sec text-center py-3 mt-auto">
      <a href="https://www.azaber.com" target="_blank">
        Created by Azaber {currentDate}
      </a>
    </footer>
  );
};

export default Footer;
