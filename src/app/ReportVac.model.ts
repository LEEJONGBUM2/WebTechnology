export interface VaccineBatch {
  vacID:string;
  batchNo:string;
  expiryDate:Date;
  quantityAvailable:number;
  status:string;
  appointmentDate: Date;
  manufactuer: string;
  vacName: string;
  remarks: string;
  patientID:string;
  vaccineBatchID:string;
}

export interface HCAdmin {
 hcadminID:string;
  username:string,
  password:string,
  fullnameHC:string,
  email:string,
  staffID:string,
  type:string,
  centreID: string,
}

export interface Patient {
 patientID:string;
  username:string;
  password:string;
  fullnameP:string;
  email:string;
  passport:string;
  type:string;
}

export interface PatientVaccine{
  patientID:string;
  fullnameP:string;
  passport:string;

  batchNo: string;
  vacID:string;
  expiryDate:Date;
  quantityAvailable:number;
  status:string;
  appointmentDate: Date;
  manufactuer: string;
  vacName: string;
  remarks: string;
  vaccineBatchID:string;
}

