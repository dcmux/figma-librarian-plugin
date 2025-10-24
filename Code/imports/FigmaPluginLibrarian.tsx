import React from "react";
import svgPaths from "./svg-npf0qmas6b";

function Text() {
  return (
    <div className="absolute content-stretch flex h-[17px] items-start left-0 top-[3px] w-[63.109px]" data-name="Text">
      <p className="basis-0 font-['Inter:Semi_Bold',_sans-serif] font-semibold grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-black">Librarian</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute h-[65px] left-0 top-[3px] w-[462.359px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[24px] left-0 not-italic text-[14px] text-black top-[-3px] w-[463px]">is a Figma plugin that syncs live GitHub component libraries, like Shadcn UI, into Figma for instantly inserting and managing real, code-based design components.</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[72px] left-[122px] top-[12px] w-[478px]" data-name="Paragraph">
      <Text />
      <Text1 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[4.65%_4.49%_3.73%_5.13%]" data-name="Group">
      <div className="absolute inset-[8.14%_8.33%_32.4%_8.97%]" data-name="Vector">
        <div className="absolute inset-[-5.85%_-4.66%_-11.96%_-4.66%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 30">
            <path d={svgPaths.p105bd300} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="2.95103" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[4.65%_4.49%_3.73%_5.13%]" data-name="Vector">
        <div className="absolute inset-[-3.8%_-4.27%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 42">
            <path d={svgPaths.p32985fd0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="square" strokeWidth="2.95103" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[42.406px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Group />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col h-[42.406px] items-start relative shrink-0 w-full" data-name="Container">
      <Icon />
    </div>
  );
}

function LibraryIcon() {
  return (
    <div className="absolute bg-[#165dff] box-border content-stretch flex flex-col items-start left-0 overflow-clip pb-0 pl-[28.5px] pr-[29.234px] pt-[27px] rounded-[16px] size-[96px] top-0" data-name="LibraryIcon">
      <Container />
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[96px] relative shrink-0 w-full" data-name="Container">
      <Paragraph />
      <LibraryIcon />
    </div>
  );
}

function Button() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[85.703px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-full items-start relative w-[85.703px]">
        <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre">Components</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-[#0088ff] h-[3px] relative shrink-0 w-[85.703px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[3px] w-[85.703px]" />
    </div>
  );
}

function Container3() {
  return (
    <div className="basis-0 grow h-[28px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[28px] items-start relative w-full">
        <Button />
        <Container2 />
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[17px] relative shrink-0 w-[44.328px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[17px] items-start relative w-[44.328px]">
        <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] text-nowrap whitespace-pre">Blocks</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[17px] relative shrink-0 w-[36.031px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[17px] items-start relative w-[36.031px]">
        <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] text-nowrap whitespace-pre">Icons</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[28px] relative shrink-0 w-[240.062px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[37px] h-[28px] items-start relative w-[240.062px]">
        <Container3 />
        <Button1 />
        <Button2 />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_12.43%]" data-name="Vector">
        <div className="absolute inset-[-5%_-5.54%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 22">
            <path d={svgPaths.p2eb1aa00} id="Vector" stroke="var(--stroke-0, #646464)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.667%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
            <path d={svgPaths.p1e531d00} id="Vector" stroke="var(--stroke-0, #646464)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 size-[24px] top-0" data-name="Button">
      <Icon1 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <path d={svgPaths.p1d519b00} fill="var(--fill-0, #0088FF)" id="Vector" />
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[36px] size-[24px] top-0" data-name="Button">
      <Icon2 />
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[24px] relative shrink-0 w-[60px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[60px]">
        <Button3 />
        <Button4 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex h-[28px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <Container5 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #646464)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="basis-0 grow h-[17px] min-h-px min-w-px relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[17px] items-start relative w-full">
        <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre">Shadcn/ui</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[17px] relative shrink-0 w-[92.641px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[17px] items-center relative w-[92.641px]">
        <Icon3 />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[17px] relative shrink-0 w-[60.766px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[17px] relative w-[60.766px]">
        <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[normal] left-0 not-italic text-[14px] text-black top-0 w-[61px]">44 found</p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="h-[17px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[17px] items-center justify-between pl-0 pr-[14px] py-0 relative w-full">
          <Container7 />
          <Paragraph2 />
        </div>
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[21px] relative shrink-0 w-[205.391px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[205.391px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[21px] left-0 not-italic text-[#646464] text-[14px] text-nowrap top-0 whitespace-pre">Select a component to preview</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute bg-white box-border content-stretch flex h-[194px] items-center justify-center left-0 pl-0 pr-[0.016px] py-0 rounded-[4px] top-[66px] w-[600px]" data-name="Container">
      <Paragraph3 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M14 14L11.1067 11.1067" id="Vector" stroke="var(--stroke-0, #646464)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p107a080} id="Vector_2" stroke="var(--stroke-0, #646464)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function TextInput() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Text Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[21px] items-center overflow-clip relative rounded-[inherit] w-full">
        <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#646464] text-[14px] text-nowrap whitespace-pre">Select a component...</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] h-[21px] items-center px-[14px] py-0 relative w-full">
          <Icon4 />
          <TextInput />
        </div>
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 6">
            <path d={svgPaths.p32098840} id="Vector" stroke="var(--stroke-0, #646464)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="h-[48px] relative shrink-0 w-[45px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#d9dbe3] border-[0px_0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[48px] items-start pb-0 pl-[15px] pr-[14px] pt-[16px] relative w-[45px]">
        <Icon5 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex h-[48px] items-center relative shrink-0 w-full" data-name="Container">
      <Container9 />
      <Button6 />
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col h-[50px] items-start left-0 p-px rounded-[4px] top-0 w-[600px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d9dbe3] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Container10 />
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[260px] relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <Container11 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[285px] items-start relative shrink-0 w-full" data-name="Container">
      <Button5 />
      <Container12 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #646464)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="basis-0 grow h-[17px] min-h-px min-w-px relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[17px] items-start relative w-full">
        <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre">Tailwind CSS</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[17px] relative shrink-0 w-[112.344px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[17px] items-center relative w-[112.344px]">
        <Icon6 />
        <Paragraph4 />
      </div>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[17px] relative shrink-0 w-[60.516px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[17px] relative w-[60.516px]">
        <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[normal] left-0 not-italic text-[14px] text-black top-0 w-[61px]">64 found</p>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="h-[17px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[17px] items-center justify-between pl-0 pr-[14px] py-0 relative w-full">
          <Container14 />
          <Paragraph5 />
        </div>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] h-[546px] items-start relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Container6 />
      <Container13 />
      <Button7 />
    </div>
  );
}

function Container16() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[1530px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start overflow-clip pb-0 pt-[40px] px-[465px] relative rounded-[inherit] w-[1530px]">
        <Container15 />
      </div>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[33px] top-[2.5px] w-[279.609px]" data-name="Paragraph">
      <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre">Create a component with all variants</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute bg-white left-0 rounded-[4px] size-[25px] top-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute h-[25px] left-0 top-[25.5px] w-[312.609px]" data-name="Container">
      <Paragraph6 />
      <Container17 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d="M6.66667 16H25.3333" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d="M16 6.66667V25.3333" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute bg-[#165dff] box-border content-stretch flex items-center justify-center left-[524px] rounded-[3.35544e+07px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[76px] top-0" data-name="Button">
      <Icon7 />
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[76px] relative shrink-0 w-full" data-name="Container">
      <Container18 />
      <Button8 />
    </div>
  );
}

function Container20() {
  return (
    <div className="bg-white h-[157px] relative shrink-0 w-[1530px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d9dbe3] border-[1px_0px_0px] border-solid inset-0 pointer-events-none shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[157px] items-start pb-0 pt-[41px] px-[465px] relative w-[1530px]">
        <Container19 />
      </div>
    </div>
  );
}

function Section() {
  return (
    <div className="h-0 relative shrink-0 w-[1530px]" data-name="Section">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-0 w-[1530px]" />
    </div>
  );
}

function App() {
  return (
    <div className="bg-gray-50 content-stretch flex flex-col h-[968px] items-start relative shrink-0 w-full" data-name="App">
      <Container16 />
      <Container20 />
      <Section />
    </div>
  );
}

export default function FigmaPluginLibrarian() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Figma Plugin - Librarian">
      <App />
    </div>
  );
}