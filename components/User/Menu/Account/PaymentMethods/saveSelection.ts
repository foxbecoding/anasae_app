import { useSnackbarStore } from '@/store';
import { isSaving, config, selectedAddress, userMenuStore, userStore } from './AddBillingAddress.vue';

export const saveSelection = async () => {
isSaving.value = true;

const { data, error, status } = await useApi({
path: `${config.public.API_USER_BILLING_ADDRESSES}`,
method: 'POST',
data: {
address: selectedAddress.value.pk,
payment_method: userMenuStore.walletSelectedPaymentMethodPk
}
});

if (status.value == 'error') {
isSaving.value = false;
console.log(error.value);
return;
}
userStore.user = data.value;
isSaving.value = false;
if (IsPaymentMethodDetails.value) {
console.log('fox');
}
useSnackbarStore().setSnackbar('Billing address saved', true);
};
