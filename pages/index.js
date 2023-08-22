import React, { useRef, useState } from 'react';
import { Tempelate1, TForm1 } from '../templates/tempelate1';
import { Tempelate2, TForm2 } from '../templates/template2';
import ReactToPrint from 'react-to-print';
import {
  printPdf,
  removeUnsavedTemplates,
  renderTemplate,
} from '../utils/makepdf';

export default function Home() {
  const [templateList, setTemplateList] = useState({ templates: [] });
  const [tempelateNumber, setTempelateNumber] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState(undefined);
  const [print, setPrint] = useState(false);

  const componentToPrint = useRef();

  return (
    <div>
      <select
        name=""
        id=""
        onChange={(e) => setSelectedTemplate(e.target.value)}
      >
        <option hidden={true}>Choose template</option>
        <option value="t1">Tempelate 1</option>
        <option value="t2">Tempelate 2</option>
      </select>
      {selectedTemplate === 't1' && (
        <TForm1
          templateList={templateList}
          setTemplateList={setTemplateList}
          tempelateNumber={tempelateNumber}
          setTempelateNumber={setTempelateNumber}
        />
      )}
      {selectedTemplate === 't2' && (
        <TForm2
          templateList={templateList}
          setTemplateList={setTemplateList}
          tempelateNumber={tempelateNumber}
          setTempelateNumber={setTempelateNumber}
        />
      )}
      {selectedTemplate === 't1' && (
        <Tempelate1
          templateList={templateList}
          tempelateNumber={tempelateNumber}
        />
      )}
      {selectedTemplate === 't2' && (
        <Tempelate2
          templateList={templateList}
          tempelateNumber={tempelateNumber}
        />
      )}
      <div>
        {/* <button
          style={{ marginTop: '2rem' }}
          onClick={() => {
            setPrint(true);
            setTemplateList(removeUnsavedTemplates(templateList));
          }}
        >
          Print
        </button> */}
        <ReactToPrint
          trigger={() => {
            return <button>Print this out!</button>;
          }}
          content={() => componentToPrint.current}
        />
      </div>
      <ComponentToPrint templateList={templateList} ref={componentToPrint} />
    </div>
  );
}

// eslint-disable-next-line react/display-name
export const ComponentToPrint = React.forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      {Object.values(props.templateList.templates).map((template, index) =>
        renderTemplate(props.templateList, index )
      )}
    </div>
  );
});
