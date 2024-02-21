import { FormBuilder } from "@/components/FormBuilder"
import { Page, PageContent, PageTopBar } from "@/spa/layout"
import { HStack, Heading } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"
import { useInputCreate, useInputDecrementOrder, useInputDelete, useInputDetails, useInputDisplayToClient, useInputIncrementOrder, useInputList, useInputUpdate } from "./inputs.service"
import { useToastError, useToastSuccess } from "@/components/Toast";

const PageInputs = () => {

    const navigate = useNavigate();
    const toastError = useToastError();
    const toastSuccess = useToastSuccess();
    const { t } = useTranslation(['common']);
    const { subCategoryId } = useParams();

    const { mutate: incrementOrder, isLoading: isIncrementInputLoading } = useInputIncrementOrder({
        onError: (error) => {
            toastError(error?.response?.data || t('common:use.errorOccurred'));
        },
        onSuccess: () => {
            toastSuccess({
                title: t('common:Inputs.SuccessUpdated'),
            });
        },
    });

    const { mutate: decrementOrder, isLoading: isDecrementInputLoading } = useInputDecrementOrder({
        onError: (error) => {
            toastError(error?.response?.data || t('common:use.errorOccurred'));
        },
        onSuccess: () => {
            toastSuccess({
                title: t('common:Inputs.SuccessUpdated'),
            });
        },
    });

    const { mutate: updateInput, isLoading: isUpdateInputLoading } = useInputUpdate(
        {
            onError: (error) => {
                if (error.response) {
                    toastError({
                        title:
                            (error?.response?.data as string) ||
                            t('common:use.errorOccurred'),
                    });
                }
            },
            onSuccess: () => {
                toastSuccess({
                    title: t('common:Inputs.SuccessUpdated'),
                });
            },
        });

    const { mutate: deleteInput, isLoading: isDeleteInputLoading } = useInputDelete(
        {
            onError: (error) => {
                if (error.response) {
                    toastError({
                        title:
                            (error?.response?.data as string) ||
                            t('common:use.errorOccurred'),
                    });
                }
            },
            onSuccess: () => {
                toastSuccess({
                    title: t('common:Inputs.SuccessDeleted'),
                });
            },
        });

    const { mutate: changeInputDisplayStatus, isLoading: isChangeDisplayStatus } = useInputDisplayToClient({
        onError: (error) => {
            toastError(error?.response?.data || t('common:use.errorOccurred'));
        },
        onSuccess: () => {
            toastSuccess({
                title: t('common:Inputs.SuccessUpdated'),
            });
        },
    })

    const { mutate: createInput, isLoading: createInputLoading } = useInputCreate(subCategoryId,
        {
            onError: (error) => {
                if (error.response) {
                    toastError({
                        title:
                            (error?.response?.data as string) || t('common:use.errorOccurred'),
                    });
                }
            },
            onSuccess: () => {
                toastSuccess({
                    title: t('common:Inputs.SuccessAdd'),
                });
            },
        });

    const { defaultInputList } = useInputList(subCategoryId);
    const { GetDetails } = useInputDetails();

    return (
        <Page containerSize="xl">
            <PageContent>
                <PageTopBar mb="4" w="full" showBack onBack={() => navigate(-1)}>
                    <HStack justifyContent="space-between" zIndex="99">
                        <Heading size="md">{t('common:Inputs.Title')}</Heading>
                    </HStack>
                </PageTopBar>
                <FormBuilder
                    subCategoryId={subCategoryId}
                    getDetails={GetDetails}
                    isDecrementInputLoading={isDecrementInputLoading}
                    isIncrementInputLoading={isIncrementInputLoading}
                    isChangeDisplayStatus={isChangeDisplayStatus}
                    isDeleteInputLoading={isDeleteInputLoading}
                    isUpdateInputLoading={isUpdateInputLoading}
                    updateInput={updateInput}
                    incrementOrder={incrementOrder}
                    decrementOrder={decrementOrder}
                    changeDisplayStatus={changeInputDisplayStatus}
                    deleteInput={deleteInput}
                    defaultInputList={defaultInputList}
                    createInput={createInput}
                    createInputLoading={createInputLoading} />
            </PageContent>
        </Page>
    )
}
export default PageInputs;