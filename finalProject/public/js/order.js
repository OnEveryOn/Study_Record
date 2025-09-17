  const urlParams = new URLSearchParams(window.location.search);
  const encodedData = urlParams.get('data');
  const ipt_productName = document.getElementById("ipt_name");
  const ipt_price = document.getElementById("ipt_price");
  const ipt_userName = document.getElementById("ipt_userName")
  const ipt_userEmail = document.getElementById("ipt_userEmail")

const onLoadHandler = async (e) => {
    let response;
    // sessionid를 사용하여 사용자 정보 조회
    // loginType에 따른 사용자 정보 조회 방법 분기 처리
    const loginType = sessionStorage.getItem("loginType")
    if(loginType === "kakao"){
        response = await axios({
            method : "POST",
            url : "/auth/profile",
            withCredentials: true 
        })
    }else{
        // 일반 사용자 정보 조회
    }
    if(response.data.success){
        ipt_userName.value = response.data.userName
        ipt_userEmail.value = response.data.userEmail
        return
    }
}

if (encodedData) {
    const orderData = JSON.parse(decodeURIComponent(encodedData));
    
    // 상품 정보 설정
    ipt_price.value = orderData.product.price;
    ipt_productName.value = orderData.product.name;
    
}


const m_Completepayment = ( FormOrJson, closeEvent ) =>
    {
        let frm = document.order_info; 
    
        /********************************************************************/
        /* FormOrJson은 가맹점 임의 활용 금지                               */
        /* frm 값에 FormOrJson 값이 설정 된 frm 값으로 활용 하셔야 됩니다.  */            
        /********************************************************************/
        GetField( frm, FormOrJson ); 

        /* 결제인증 완료 후 결제승인 요청을 위한 비즈니스 로직 구현 */
        if( frm.res_cd.value == "0000" )
    {    
        frm.submit(); 
    }
    /* 결제인증 실패에 대한 처리 */
    else
        {
        alert( "[" + frm.res_cd.value + "] " + frm.res_msg.value );
        closeEvent();
    }
}


/* 
결제창 호출 JS 
개발 : https://testspay.kcp.co.kr/plugin/kcp_spay_hub.js  
운영 : https://spay.kcp.co.kr/plugin/kcp_spay_hub.js  
*/

/* 표준웹 실행 */
const jsf__pay = ( form ) =>
    {
        try
        {
        console.log(KCP_Pay_Execute_Web( form ));
    }
    catch (e)
    {
        /* IE 에서 결제 정상종료시 throw로 스크립트 종료 */ 
    }
}

const btn_payReq = document.getElementById("btn_payReq");
btn_payReq.addEventListener("click", (e) => {
    jsf__pay(document.forms['order_info']);
});



// 주문번호 생성 예제
const init_orderid = () => 
    { 
        let today = new Date();
        let year  = today.getFullYear();
    let month = today.getMonth()+ 1;
    let date  = today.getDate();
    let time  = today.getTime();
    
    if(parseInt(month) < 10)
        {
            month = "0" + month;
        }
        
        const vOrderID = "TEST" + year + "" + month + "" + date + "" + time;
        
        document.forms[0].ordr_idxx.value = vOrderID;
}       

window.addEventListener("load", init_orderid)
window.addEventListener("load", onLoadHandler)

