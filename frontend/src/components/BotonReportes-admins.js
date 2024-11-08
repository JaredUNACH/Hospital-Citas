import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const BotonReportesAdmins = () => {
  const handleGeneratePDF = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/generate-admins-pdf', {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'admins_report.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <StyledWrapper>
      <button className="print-btn" onClick={handleGeneratePDF}>
        <span className="printer-wrapper">
          <span className="printer-container">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 92 75">
              <path strokeWidth={5} stroke="black" d="M12 37.5H80C85.2467 37.5 89.5 41.7533 89.5 47V69C89.5 70.933 87.933 72.5 86 72.5H6C4.067 72.5 2.5 70.933 2.5 69V47C2.5 41.7533 6.75329 37.5 12 37.5Z" />
              <mask fill="white" id="path-2-inside-1_30_7">
                <path d="M12 12C12 5.37258 17.3726 0 24 0H57C70.2548 0 81 10.7452 81 24V29H12V12Z" />
              </mask>
              <path mask="url(#path-2-inside-1_30_7)" fill="black" d="M7 12C7 2.61116 14.6112 -5 24 -5H57C73.0163 -5 86 7.98374 86 24H76C76 13.5066 67.4934 5 57 5H24C20.134 5 17 8.13401 17 12H7ZM81 29H12H81ZM7 29V12C7 2.61116 14.6112 -5 24 -5V5C20.134 5 17 8.13401 17 12V29H7ZM57 -5C73.0163 -5 86 7.98374 86 24V29H76V24C76 13.5066 67.4934 5 57 5V-5Z" />
              <circle fill="black" r={3} cy={49} cx={78} />
            </svg>
          </span>
          <span className="printer-page-wrapper">
            <span className="printer-page" />
          </span>
        </span>
        Print
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .print-btn {
    width: 100px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border: 1px solid rgb(213, 213, 213);
    border-radius: 10px;
    gap: 10px;
    font-size: 16px;
    cursor: pointer;
    overflow: hidden;
    font-weight: 500;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.065);
    transition: all 0.3s;
  }
  .printer-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 100%;
  }
  .printer-container {
    height: 50%;
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  .printer-container svg {
    width: 100%;
    height: auto;
    transform: translateY(4px);
  }
  .printer-page-wrapper {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
  .printer-page {
    width: 70%;
    height: 10px;
    border: 1px solid black;
    background-color: white;
    transform: translateY(0px);
    transition: all 0.3s;
    transform-origin: top;
  }
  .print-btn:hover .printer-page {
    height: 16px;
    background-color: rgb(239, 239, 239);
  }
  .print-btn:hover {
    background-color: rgb(239, 239, 239);
  }
`;

export default BotonReportesAdmins;