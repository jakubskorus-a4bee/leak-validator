import React, { useState, useEffect } from 'react';

function TextChecker() {
  const [fileContent, setFileContent] = useState<string>('');
  const [textInput, setTextInput] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isTextIncluded, setIsTextIncluded] = useState<boolean>(false);
  const [textOccurrences, setTextOccurrences] = useState<number>(0);

  useEffect(() => {
    fetchFileContent();
  }, []);

  const fetchFileContent = async () => {
    try {
      const response = await fetch('pl.txt'); 
      const content = await response.text();
      setFileContent(content);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckText = () => {
    if (textInput.length !== 0 && fileContent) {
        const occurrences = fileContent.split(textInput).length - 1;
        setIsChecked(true);
        setIsTextIncluded(occurrences > 0);
        setTextOccurrences(occurrences);
    }
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleCheckText();
    }
    if (event.key === 'Backspace') {
        setIsChecked(false);
        setIsTextIncluded(false);
        setTextOccurrences(0);  
    }
  };

  return (
    <>
        <div className="textCheckerContainer">
          <h1>Wpisz tekst, który chcesz sprawdzić:</h1>
          <div className='checkTextForm'>
              <input
                  className='checkTextInput'
                  disabled={!fileContent}
                  placeholder='(na przykład: login, hasło, adres e-mail, nazwa portalu, itp.)'
                  type="text" value={textInput}
                  onChange={(event) => setTextInput(event.target.value)}
                  onKeyDown={handleInputKeyDown}
              />
              <button onClick={handleCheckText} className='button'>Sprawdź</button>
          </div>
          {isTextIncluded ? (
            <p className='alert'>Niedobrze, Twoje dane zostały odnalezione w pliku <b>{textOccurrences}</b> {textOccurrences === 1 ? 'raz' : 'razy'}</p>
          ) : (isChecked ? <p className='safe'>Super jesteś bezpieczny, nie znaleźliśmy Twoich danych</p> : '')}
        </div>
      {!fileContent && 
      <div className='loading'>
        <p className='loading-text'>Loading...</p>
        <div className="loading-ring"></div>
      </div>}
    </>
  );
}

export default TextChecker;
