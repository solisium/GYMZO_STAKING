import React, { useRef, useState,useEffect } from 'react'
import './Home_style.css'
import { AiOutlineRise } from 'react-icons/ai'
import { loadWeb3 } from '../../apis/api'
import { ToastContainer, toast } from 'react-toastify';


import { contract, abi, tokenAddress, tokeAbi } from '../../utilies/constant'

export default function Home_page() {

    let  [days, setdays] = useState('')
    let [StakingG,setStakingG]=useState('')
    //  [Input, setInput] = useState('')

    let getdata = useRef(0);




    const stake = async () => {
        let acc = await loadWeb3();
        
        if (acc == "No Wallet") {
            toast.error("Not Connected to Wallet")

        }
        else if (acc == "Wrong Network") {
            toast.error("Wrong Newtwork please connect to test net")
        }
        else {
            try {
                const web3 = window.web3;
                let tokenapp = new web3.eth.Contract(tokeAbi, tokenAddress)
                let contractAcc=new web3.eth.Contract(abi,contract)
                let enteredVal = getdata.current.value;
                console.log("enteredVal", enteredVal);
                console.log("Days here",  days)
                await tokenapp.methods.approve(contract, web3.utils.toWei(enteredVal)).send({

                    from: acc

                })
                toast.success("Transaction Successful.");
                // console.log("Approve here",  enteredVal)
                // days= days.toString();
                await contractAcc.methods.farm(web3.utils.toWei(enteredVal),days).send({
                    from:acc
                })

            } catch (error) {
                console.log("Error while staking ",error);
                toast.error("Transaction Failed")

            }
        }


    }

    const GlobleStaking=async()=>{
        const web3 = window.web3;
        let contractAcc=new web3.eth.Contract(abi,contract)

        let GStaking= await contractAcc.methods.GlobleStaking().call()

        let newGStaking=web3.utils.fromWei(GStaking)
        setStakingG(newGStaking)

    }


    useEffect(() => {

        setInterval(() => {
            GlobleStaking()
        }, 1000);
       

     
    }, [])
    



    return (
        <div>

            <div className="Home_Page_Bg_Color">
                <div className="overlay"></div>
                <div className="container">
                    <div className="main_heading">

                        <div className="inner_div_here">
                            <h1>GYZMO STAKING DASHBOARD</h1>
                            <img src="GYZOBSERVER.png" alt="" width="100%" />
                        </div>

                    </div>

                    {/* __________________-------Cardshere------------------------*/}

                    <div className="row mt-5">
                        <div className="col-lg-6">
                            <div className="card_main">
                                <div className="card card_innerhere">
                                    <div className="card-body">
                                        <h3>MY GYZMO STAKING</h3>
                                        <div className="row mt-4">
                                            <div className="col-lg-4 col-md-5 mt-4">
                                                <div className="first_col_1">
                                                    <h6>TOTaL STAKING</h6>
                                                    <h2>21,000  <small>GYZMO</small></h2>
                                                    <small>~$840.00</small>
                                                </div>

                                            </div>
                                            <div className="col-lg-8 col-md-7">

                                                <div className="card second_card_1">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-lg-5 col-md-5" >
                                                                <div className="inner_div_first_col">

                                                                    <h6>AVAILABLE WALLET</h6>
                                                                    <h2>12  <small>GYZMO</small></h2>
                                                                    <small>~$840.00</small>
                                                                </div>

                                                            </div>
                                                            <div className="col-lg-7 col-md-7" >

                                                                <div className="secon_div_button">

                                                                    <input type="text" ref={getdata} className='form-control mb-2 inputfiled' />
                                                                    <button className='btn btn-primary btn_stakhere ' onClick={() => stake()}>Stake</button>


                                                                    <div className="inner_btn_all_here mt-2">
                                                                        <div className="one2one_btn">
                                                                            <div className="linediv">
                                                                                <button className='btn btn-small btn_small_here ' onClick={() => setdays("30")}>30</button>

                                                                            </div>

                                                                            <small className="hover_span" >100% APY</small>
                                                                        </div>
                                                                        <div className="one2one_btn">
                                                                            <div className="linediv">

                                                                                <button className='btn btn-small btn_small_here ms-1' onClick={() => setdays("60")}>60</button>
                                                                            </div>
                                                                            <small className="hover_span" >115% APY</small>

                                                                        </div>
                                                                        <div className="one2one_btn">
                                                                            <div className="linediv">
                                                                                <button className='btn btn-small btn_small_here ms-1' onClick={() => setdays("120")}>120</button>
                                                                            </div>
                                                                            <small className="hover_span" >130% APY</small>

                                                                        </div>
                                                                        <div className="one2one_btn">
                                                                            <div className="linediv">

                                                                                <button className='btn btn-small btn_small_here ms-1' onClick={() => setdays("365")}>1Y</button>
                                                                            </div>
                                                                            <small className="hover_span" >160% APY</small>

                                                                        </div>







                                                                    </div>




                                                                </div>


                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                        <h5 className='mt-3'>CURRENT STAKING <span className='current_stking'>(3)</span></h5>
                                        <div className="card current_card_here">
                                            <div className="card-body ">

                                                <div className="row">
                                                    <div className="col-lg-5 col-md-5">

                                                        <div className='current_body'>
                                                            <div className="current_inner">

                                                                <h6>STAKED</h6>
                                                                <h2>13,000  <small>GYZMO</small></h2>

                                                            </div>
                                                            <div className="current_inner">
                                                                <h6>DAYS</h6>
                                                                <h2>30</h2>
                                                            </div>
                                                            <div className="current_inner">
                                                                <h6>APY</h6>
                                                                <h2>100%</h2>
                                                            </div>


                                                        </div>



                                                    </div>
                                                    <div className="col-lg-7 col-md-7" >
                                                        <div className='current_body'>
                                                            <div className="current_inner">
                                                                <h6>PENDING REWARDS</h6>
                                                                <h2>13  <small>GYZMO</small>  <small>~$0.52</small> </h2>
                                                            </div>
                                                            <div className="current_inner">
                                                                <h6>CLAIM IN 57 <small>d </small>11 <small>h</small> 36 <small>m</small></h6>
                                                                <button className='btn btn_ce_stake'>Cancel stake</button>
                                                            </div>

                                                        </div>


                                                    </div>

                                                </div>





                                            </div>

                                        </div>

                                        <div className="card current_card_here">
                                            <div className="card-body ">

                                                <div className="row">
                                                    <div className="col-lg-5 col-md-5">

                                                        <div className='current_body'>
                                                            <div className="current_inner">

                                                                <h6>STAKED</h6>
                                                                <h2>5,000  <small>GYZMO</small></h2>

                                                            </div>
                                                            <div className="current_inner">
                                                                <h6>DAYS</h6>
                                                                <h2>60</h2>
                                                            </div>
                                                            <div className="current_inner">
                                                                <h6>APY</h6>
                                                                <h2>130%</h2>
                                                            </div>


                                                        </div>



                                                    </div>
                                                    <div className="col-lg-7 col-md-7" >
                                                        <div className='current_body'>
                                                            <div className="current_inner">
                                                                <h6>PENDING REWARDS</h6>
                                                                <h2>9  <small>GYZMO</small>  <small>~$0.38</small> </h2>
                                                            </div>
                                                            <div className="current_inner">
                                                                <h6>CLAIM IN 57 <small>d </small>11 <small>h</small> 36 <small>m</small></h6>
                                                                <button className='btn btn_ce_stake'>Cancel stake</button>
                                                            </div>

                                                        </div>


                                                    </div>

                                                </div>





                                            </div>

                                        </div>

                                        <div className="card current_card_here ">
                                            <div className="card-body ">

                                                <div className="row">
                                                    <div className="col-lg-5 col-md-5">

                                                        <div className='current_body'>
                                                            <div className="current_inner">

                                                                <h6>STAKED</h6>
                                                                <h2>3,000  <small>GYZMO</small></h2>

                                                            </div>
                                                            <div className="current_inner">
                                                                <h6>DAYS</h6>
                                                                <h2>90</h2>
                                                            </div>
                                                            <div className="current_inner">
                                                                <h6>APY</h6>
                                                                <h2>160%</h2>
                                                            </div>


                                                        </div>



                                                    </div>
                                                    <div className="col-lg-7 col-md-7" >
                                                        <div className='current_body'>
                                                            <div className="current_inner">
                                                                <h6>PENDING REWARDS</h6>
                                                                <h2>7.3  <small>GYZMO</small>  <small>~$0.29</small> </h2>
                                                            </div>
                                                            <div className="current_inner">
                                                                <h6>CLAIM IN 57 <small>d </small>11 <small>h</small> 36 <small>m</small></h6>
                                                                <button className='btn btn_ce_stake'>Cancel stake</button>
                                                            </div>

                                                        </div>


                                                    </div>

                                                </div>





                                            </div>

                                        </div>










                                    </div>
                                </div>









                            </div>






                        </div>
                        <div className="col-lg-6">
                            <div className="row secondcolo_row">
                                <div className="col-lg-6 col-md-6">
                                    <div className="card card_innerhere22">
                                        <div className="first_col_2">

                                            <h6>GLOBAL STAKING</h6>
                                            <h2>{StakingG}  <small>GYZMO</small></h2>
                                            <small>~$525.649</small>
                                        </div>



                                    </div>

                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="card card_innerhere22 col222">
                                        <div className="first_col_2">

                                            <h6>MAX APY</h6>
                                            <h2>160%</h2>
                                            <small>120DAYS</small>
                                        </div>



                                    </div>

                                </div>
                            </div>

                            <div className="card current_card_here" style={{ border: '1px solid #ffffff' }}>
                                <div className="card-body ">
                                    <div className="first_col_2">

                                        <h6>GYZMO STATS</h6>

                                    </div>

                                    <div className="row">
                                        <div className="col-lg-7 col-md-7">

                                            <div className='current_body'>
                                                <div className="current_inner">

                                                    <h6>GYZMO PRICE</h6>
                                                    <h2>$0.04  <small className='price_icon ms-2'><AiOutlineRise className='icon_rise ' />4.20%</small></h2>

                                                </div>

                                                <div className="current_inner">
                                                    <h6>DAILY REWARDS</h6>
                                                    <h2>14,932 GYZMO</h2>
                                                </div>


                                            </div>



                                        </div>
                                        <div className="col-lg-5 col-md-5" >
                                            <div className='current_body'>
                                                <div className="current_inner">
                                                    <h6>CIRCULATING SUPPLY</h6>
                                                    <h2>14,932,000 GYZMO </h2>
                                                </div>


                                            </div>


                                        </div>

                                    </div>





                                </div>

                            </div>




                        </div>


                    </div>





                </div>








            </div>

        </div>
    )
}
