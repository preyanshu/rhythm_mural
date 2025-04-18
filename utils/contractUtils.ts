// utils/contractUtils.js
import { ethers } from 'ethers';

// Contract ABI and address
import { contractABI , contractAddress } from '@/config';



function normalizeProxyData(data: any): any {
	return JSON.parse(
	  JSON.stringify(data, (key, value) => (typeof value === 'bigint' ? value.toString() : value))
	);
  }
  
  // Function to create contract instance with signer
  function getContract(signer: ethers.Signer): ethers.Contract {
	return new ethers.Contract(contractAddress, contractABI, signer);
  }
  
  // Function to get the submission fee
  export async function getSubmissionFee(walletSdk: any): Promise<string> {
	const provider = new ethers.BrowserProvider(walletSdk.ethereum);
	const signer = await provider.getSigner();
	const contract = getContract(signer);
	const fee: any = await contract.SUBMISSION_FEE();
	return fee.toString();
  }
  
  // Function to submit music
  export async function submitMusic(
	walletSdk: any,
	musicUrl: string,
	theme: string,
	prompt: string
  ): Promise<void> {
	const provider = new ethers.BrowserProvider(walletSdk.ethereum);
	const signer = await provider.getSigner();
	const contract = getContract(signer);
	const submissionFee:any = await contract.SUBMISSION_FEE();
	const transaction = await contract.submitMusic(musicUrl, theme, prompt, {
	  value: submissionFee,
	});
	await transaction.wait();
  }
  
  // Function to fetch submissions
  export async function getContestDetails(walletSdk: any): Promise<any[]> {
	const provider = new ethers.BrowserProvider(walletSdk.ethereum);
	const signer = await provider.getSigner();
	const contract = getContract(signer);
	const submissions = await contract.getSubmissions();
	return normalizeProxyData(submissions);
  }
  
  // Function to fetch winners
  export async function getWinners(walletSdk: any): Promise<any[]> {
	const provider = new ethers.BrowserProvider(walletSdk.ethereum);
	const signer = await provider.getSigner();
	const contract = getContract(signer);
	const winners = await contract.getWinners();
	return normalizeProxyData(winners);
  }
  
  // Function to vote for a submission
  export async function voteOnSubmission(walletSdk: any, submissionIndex: number): Promise<void> {
	const provider = new ethers.BrowserProvider(walletSdk.ethereum);
	const signer = await provider.getSigner();
	const contract = getContract(signer);
	const transaction = await contract.vote(submissionIndex);
	await transaction.wait();
  }

  export async function getCurrentTheme(walletSdk: any): Promise<string> {
	const provider = new ethers.BrowserProvider(walletSdk.ethereum);
	const signer = await provider.getSigner();
	const contract = getContract(signer);
	const theme: any = await contract.currentTheme();
	return theme;
  }

  export async function mintMusicNFT(walletSdk: any, winnerIndex: number, uri: string): Promise<void> {
	const provider = new ethers.BrowserProvider(walletSdk.ethereum);
	const signer = await provider.getSigner();
	const contract = getContract(signer);
	const transaction = await contract.mintMusicNFT(winnerIndex, uri);
	await transaction.wait();
  }
