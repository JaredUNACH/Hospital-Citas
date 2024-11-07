export const getSpecialtyWithGender = (specialty, gender) => {
    const specialties = {
      "Dermatología": gender === 'H' ? "Dermatólogo" : "Dermatóloga",
      "Endocrinología": gender === 'H' ? "Endocrinólogo" : "Endocrinóloga",
      "Gastroenterología": gender === 'H' ? "Gastroenterólogo" : "Gastroenteróloga",
      "Geriatría": gender === 'H' ? "Geriatra" : "Geriatra",
      "Hematología": gender === 'H' ? "Hematólogo" : "Hematóloga",
      "Infectología": gender === 'H' ? "Infectólogo" : "Infectóloga",
      "Nefrología": gender === 'H' ? "Nefrólogo" : "Nefróloga",
      "Neurología": gender === 'H' ? "Neurólogo" : "Neuróloga",
      "Neumología": gender === 'H' ? "Neumólogo" : "Neumóloga",
      "Oftalmología": gender === 'H' ? "Oftalmólogo" : "Oftalmóloga",
      "Oncología": gender === 'H' ? "Oncólogo" : "Oncóloga",
      "Pediatría": gender === 'H' ? "Pediatra" : "Pediatra",
      "Psiquiatría": gender === 'H' ? "Psiquiatra" : "Psiquiatra",
      "Reumatología": gender === 'H' ? "Reumatólogo" : "Reumatóloga",
      "Urología": gender === 'H' ? "Urólogo" : "Uróloga",
      "Ginecología": gender === 'H' ? "Ginecólogo" : "Ginecóloga",
      "Traumatología": gender === 'H' ? "Traumatólogo" : "Traumatóloga",
      "Otorrinolaringología": gender === 'H' ? "Otorrinolaringólogo" : "Otorrinolaringóloga",
      "Cirugía General": gender === 'H' ? "Cirujano General" : "Cirujana General",
      "Medicina Interna": gender === 'H' ? "Internista" : "Internista",
      "Medicina Familiar": gender === 'H' ? "Médico Familiar" : "Médica Familiar",
      "Anestesiología": gender === 'H' ? "Anestesiólogo" : "Anestesióloga",
      "Radiología": gender === 'H' ? "Radiólogo" : "Radióloga",
      "Cardiología": gender === 'H' ? "Cardiólogo" : "Cardióloga"
    };
    return specialties[specialty] || specialty;
  };