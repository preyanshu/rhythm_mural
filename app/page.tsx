'use client';

import { useAuth } from '@/context/AuthContext';
import WalletCard from '@/components/wallet_card';
import HomeScreen from '@/components/home_screen';
import { NETWROK_PARAMS } from '@/config';


export default function Home() {
	const { userAddr , chainId} = useAuth();
    console.log(userAddr,chainId);
    

	return (
		<div className="page-container">


			{((!userAddr) || (chainId!=='0x' + Number(NETWROK_PARAMS.chainId).toString(16))) ? (
				
				<WalletCard />
				
			) : (<>
			
			<HomeScreen /> 


</>)}

           
			
			
		</div>
	);
}
