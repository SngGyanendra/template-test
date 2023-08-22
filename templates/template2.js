import React, { useEffect, useState } from 'react';
import Styles from './tempelate1.module.css';

export function Tempelate2({ templateList, tempelateNumber }) {
  return (
    <div className={Styles.container}>
      <div>
        Address :{templateList.templates[`${tempelateNumber}`]?.values?.address}
      </div>
      <div>
        Country :{templateList.templates[`${tempelateNumber}`]?.values?.country}
      </div>
    </div>
  );
}

export function TForm2({
  templateList,
  setTemplateList,
  tempelateNumber,
  setTempelateNumber,
}) {
  const [formData, setFormData] = useState({
    address: '',
    country: '',
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
      type: 't2',
      saved: isSaved,
    };
    setTemplateList(formJSON);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, isSaved]);

  useEffect(() => {
    if (isSaved) {
      setTempelateNumber(tempelateNumber + 1);
      setIsSaved(false);
      setFormData({
        address: '',
        country: '',
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
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="country"
        id=""
        placeholder="Country"
        value={formData.country}
        onChange={handleInputChange}
      />
      <button type="submit">Save</button>
    </form>
  );
}
