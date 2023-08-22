import React, { useEffect, useState } from 'react';
import Styles from './tempelate1.module.css';

export function Tempelate1({ templateList, tempelateNumber }) {
  return (
    <div className={Styles.container}>
      <div>
        Name :{templateList.templates[`${tempelateNumber}`]?.values?.name}
      </div>
      <div>
        Contact :{templateList.templates[`${tempelateNumber}`]?.values?.contact}
      </div>
      <div>
        Age : {templateList.templates[`${tempelateNumber}`]?.values?.age}
      </div>
    </div>
  );
}

export function TForm1({
  templateList,
  setTemplateList,
  tempelateNumber,
  setTempelateNumber,
}) {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    age: '',
  });
  const [isSaved, setIsSaved] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const formJSON = { ...templateList };
    formJSON.templates[`${tempelateNumber}`] = {
      values: formData,
      type: 't1',
      saved: isSaved,
    };
    setTemplateList(formJSON);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, isSaved]);

  useEffect(() => {
    if (isSaved) {
      setTempelateNumber(tempelateNumber + 1);
      setIsSaved(false)
      setFormData({
        name: '',
        contact: '',
        age: '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSaved]);

  return (
    <form
      action=""
      style={{ marginTop: '2rem' }}
      onSubmit={(e) => {
        e.preventDefault();
        setIsSaved(true);
      }}
    >
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="contact"
        id=""
        placeholder="Contact"
        value={formData.contact}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="age"
        id=""
        placeholder="Age"
        value={formData.age}
        onChange={handleInputChange}
      />
      <button type="submit">Save</button>
    </form>
  );
}
