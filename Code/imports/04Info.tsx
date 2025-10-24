import React from "react";
import svgPaths from "./svg-el2c9gmz2n";

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-start relative shrink-0 w-[64px]">
      <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[20px] text-black w-full">Blocks</p>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0">
      <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[20px] text-black text-nowrap whitespace-pre">Components</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[37px] items-start relative shrink-0">
      <Frame5 />
      <Frame18 />
      <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[20px] text-black text-nowrap whitespace-pre">Icons</p>
    </div>
  );
}

function Frame23() {
  return (
    <div className="h-[35px] relative shrink-0 w-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 35">
        <g id="Frame 23">
          <path d={svgPaths.p1d519b00} fill="var(--fill-0, #0088FF)" id="Vector" />
          <rect fill="var(--fill-0, #0088FF)" height="3" id="Rectangle 1" width="24" y="32" />
        </g>
      </svg>
    </div>
  );
}

function Frame13() {
  return (
    <div className="absolute content-stretch flex items-start justify-between left-[40px] top-[205px] w-[615px]">
      <Frame6 />
      <Frame23 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[29.69%_32.03%_29.27%_31.25%]" data-name="Group">
      <div className="absolute inset-[-2.86%_-3.19%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 51 57">
          <g id="Group">
            <path d={svgPaths.p101ee00} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="3" />
            <path d={svgPaths.p13b37400} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="square" strokeWidth="3" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Library() {
  return (
    <div className="bg-[#0088ff] overflow-clip relative rounded-[25px] shrink-0 size-[128px]" data-name="Library">
      <Group />
    </div>
  );
}

function Frame14() {
  return (
    <div className="absolute content-stretch flex gap-[26px] items-center left-[41px] top-[47px] w-[617px]">
      <Library />
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[0px] text-[16px] text-black w-[463px]">
        <span>{`Librarian `}</span>
        <span className="font-['Inter:Regular',_sans-serif] font-normal">is a Figma plugin that syncs live GitHub component libraries, like Shadcn UI, into Figma for instantly inserting and managing real, code-based design components.</span>
      </p>
    </div>
  );
}

function AboutContent() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[17px] items-start left-[40px] not-italic text-black top-[279px] w-[619px]" data-name="about content">
      <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[20px] w-full">About</p>
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[0px] w-full">
        <p className="leading-[24px] mb-0 text-[14px]">
          <span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold not-italic">Librarian</span>
          <span>{` is a Figma plugin that connects live GitHub repositories—like Shadcn UI—directly to your design environment, transforming code-based component libraries into visual, draggable design assets.`}</span>
        </p>
        <p className="leading-[24px] mb-0 text-[14px]">&nbsp;</p>
        <p className="leading-[24px] mb-0 text-[14px]">{`It fetches component metadata from repos, displays them in a searchable list, and lets you instantly insert labeled placeholders or frame previews onto the canvas for rapid wireframing and layout planning. `}</p>
        <p className="leading-[24px] mb-0 text-[14px]">&nbsp;</p>
        <p className="leading-[24px] text-[14px]">
          <span>{`Acting as a bridge between design systems and source code, `}</span>
          <span className="font-['Inter:Bold',_sans-serif] font-bold not-italic">Librarian</span>
          <span>{` ensures designers work with the same building blocks developers use—always up to date, version-synced, and ready for prototyping.`}</span>
        </p>
      </div>
    </div>
  );
}

export default function Component04Info() {
  return (
    <div className="bg-gray-50 overflow-clip relative rounded-[16px] size-full" data-name="04_Info">
      <Frame13 />
      <Frame14 />
      <AboutContent />
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[24px] left-[408px] not-italic text-[16px] text-black text-nowrap top-[855px] whitespace-pre">Copyright 2025 - david mcginn</p>
    </div>
  );
}