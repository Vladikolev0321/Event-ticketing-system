<template>
    <div>
        <MDBBtn id="connectButton" @click="buttonAction" :disabled="isDisabled">{{ buttonMessage }}</MDBBtn>
    </div>
</template>


<script>
import MetaMaskOnboarding from '@metamask/onboarding';
import {
    MDBBtn,
}
    from "mdb-vue-ui-kit";

const onboarding = new MetaMaskOnboarding();

export default {
    name: 'MetamaskConnect',
    components: {
        MDBBtn,
    },
    data() {
        return {
            onboardButton: document.getElementById('connectButton'),
            buttonMessage: '',
            isDisabled: false,
            buttonAction: null
        }
    },
    methods: {
        connectToMetamask() {
            console.log("connectToMetamask");
            window.ethereum.request({ method: 'eth_requestAccounts' });
        },
        isMetamaskInstalled() {
            const { ethereum } = window;
            return Boolean(ethereum && ethereum.isMetaMask);
        },
        onClickInstall() {
            this.buttonMessage = 'Onboarding in progress';
            this.isDisabled = true;
            onboarding.startOnboarding();
        },
        async onClickConnect() {
            console.log("onClickConnect");
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                await this.checkIfConnected();

            } catch (error) {
                console.error(error);
            }
        },
        metamaskClientCheck() {
            if (this.isMetamaskInstalled()) {
                this.buttonMessage = 'Connect to wallet';
                this.isDisabled = false;
                this.buttonAction = this.onClickConnect;
            } else {
                this.buttonMessage = 'Install Metamask';
                this.isDisabled = false;
                this.buttonAction = this.onClickInstall;
            }
        },
        async checkIfConnected() {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts.length !== 0) {
                const account = accounts[0];
                console.log('Found an authorized account:', account);
                this.buttonMessage = 'Connected';
                this.isDisabled = true;
                return true;
            } else {
                console.log('No authorized account found');
                return false;
            }
        },
    },
    beforeMount() {
        this.metamaskClientCheck();
    },


};
</script>