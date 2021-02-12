import React from "react";
import "./FormAccordion.css";
export interface MyAccordionProps {
  openPanel?: boolean; // set the panel open on page load
  accIndex?: string;
  expand?: boolean;  // use it to maintain the width of the accordion during field array
  renderHeader: () => React.ReactNode;
  renderPanel: () => React.ReactNode;
}

const FormAccordion: React.FC<MyAccordionProps> = ({
  //list,
  openPanel,
  accIndex,
  expand,
  renderPanel,
  renderHeader,
}) => {
  const headerClicked = (_event: any) => {
    _event.stopPropagation();
    const openPanel = _event.currentTarget.nextElementSibling;
    if (openPanel.classList.contains("openPanel")) {
        console.log("inside");
        openPanel.style.maxHeight = null;
        openPanel.classList.remove("openPanel");
        openPanel.classList.add("panel");
    } else {
      console.log(_event);
      _event.currentTarget.classList.toggle("active");

      /* Toggle close all panels, except on that was clicked */
      const allPanels = document.getElementsByClassName("panel");
      Array.from(allPanels).forEach((panel: any) => {
        if (_event.currentTarget.nextElementSibling !== panel) {
          panel.style.maxHeight = null;
        }
        panel.previousElementSibling.classList.remove("active");
      });
      /* Toggle between hiding and showing the active panel */
      var panel = _event.currentTarget.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    }
  };

  return (
    <div key={accIndex + "Accordion"}>
      <button id={accIndex+"Button"} className={expand ? 'accordion accordionExp' :'accordion'} onClick={headerClicked}>
        {renderHeader()}
      </button>
      <div className={openPanel ? "openPanel" : "panel OpenPanel"}>{renderPanel()}</div>
    </div>
  );
};

export default FormAccordion;

/**
 * 
 * 
 
 import React from "react";
import "./FormAccordion.css";
export interface MyAccordionProps {
  list: Array<any>;
  renderHeader: (item: any) => React.ReactNode;
  renderPanel: (item: any) => React.ReactNode;
}

const FormAccordion: React.FC<MyAccordionProps> = ({
  list,
  renderPanel,
  renderHeader,
}) => {
  const headerClicked = (_event: any) => {
    console.log(_event);
    _event.currentTarget.classList.toggle("active");
    /* Toggle close all panels, except on that was clicked */
/*     const allPanels = document.getElementsByClassName("panel");

    Array.from(allPanels).forEach((panel: any) => {
      if (_event.currentTarget.nextElementSibling !== panel) {
        panel.style.maxHeight = null;
      }
      panel.previousElementSibling.classList.remove("active");
    }); */
/* Toggle between hiding and showing the active panel */
/*    var panel = _event.currentTarget.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  };

  return (
    <div>
      {list.map((item, index) => {
        return (
          <div key={index}>
            <button className="accordion" onClick={headerClicked}>
              {renderHeader(item)}
            </button>
            <div className="panel">{renderPanel(item)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default FormAccordion;


 */
