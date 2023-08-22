import { Tempelate1, Tempelate2 } from '../templates';
// import { Preview, print } from 'react-html2pdf';

export const printPdf = (templateList) => {
  let test = removeUnsavedTemplates(templateList);
  const newtest = TemplateRenderer(test);
  //   const pe = document.getElementById('element-to-print');
  //   html2pdf().from('element').save();
};

export function removeUnsavedTemplates(templateList) {
  const filteredTemplates = Object.entries(templateList.templates).reduce(
    (acc, [key, template]) => {
      if (template.saved) {
        acc.templates[key] = template;
      }
      return acc;
    },
    { templates: {} }
  );

  return { ...templateList, ...filteredTemplates };
}

export function renderTemplate(templateList, index) {
  if (!templateList.templates[index]?.saved) {
    return;
  }
  switch (templateList.templates[index]?.type) {
    case 't1':
      return <Tempelate1 templateList={templateList} tempelateNumber={index} />;
    case 't2':
      return <Tempelate2 templateList={templateList} tempelateNumber={index} />;
    default:
      return null;
  }
}

// function TemplateRenderer(templateList) {
//   return (
//     <Preview id="jsx-template">
//       {Object.values(templateList.templates).map((template, index) =>
//         renderTemplate(templateList, index + 1)
//       )}
//     </Preview>
//   );
// }
