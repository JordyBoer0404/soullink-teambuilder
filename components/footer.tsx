import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const footer = () => {
  return (
    <div className="flex flex-row py-8 justify-center">
      <p>
        Made by
        <Button variant="link">
          <Link target="_blank" href="https://jordyboer.vercel.app/">
            Jordy Boer
          </Link>
        </Button>
      </p>
    </div>
  );
};

export default footer;
