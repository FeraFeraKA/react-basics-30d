import { useRef } from 'react';

const DataActions = ({ handleExport, handleImport, handleResetAll }) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImport(file);
      e.target.value = '';
    }
  };

  return (
    <>
      <button onClick={handleExport}>Export</button>
      <button onClick={handleButtonClick}>Import</button>
      <input
        type="file"
        accept="application/json"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <button onClick={handleResetAll}>Load initial notes</button>
    </>
  );
};

export default DataActions;
