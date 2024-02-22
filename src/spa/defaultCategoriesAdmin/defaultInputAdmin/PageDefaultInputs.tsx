import { FormBuilder } from "@/components/FormBuilder";
import { useToastError, useToastSuccess } from "@/components/Toast";
import { Page, PageContent, PageTopBar } from "@/spa/layout";
import { HStack, Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
    useDefaultAdminInputList,
    useDefaultInputCreate,
    useDefaultInputUpdate,
    useDefaultInputDelete,
    useDefaultInputIncrementOrder,
    useDefaultInputDecrementOrder,
    useDefaultInputDisplayToClient,
    useDefaultInputDetails
} from "./DefaultInputs.service";


const PageDefaultInputs = () => {
    const { defaultSubCategoryId } = useParams();
    const toastError = useToastError();
    const toastSuccess = useToastSuccess();
    const navigate = useNavigate();
    const { t } = useTranslation(['common','formBuilder']);

    const { mutate: createDefaultInput, isLoading: createDefaultInputLoading } = useDefaultInputCreate(defaultSubCategoryId, {
        onError: (error) => {
            if (error.response) {
                toastError({
                    title: (error?.response?.data as string) || t('common:use.errorOccurred'),
                });
            }
        },
        onSuccess: () => {
            toastSuccess({
                title: t('common:Inputs.SuccessAdd'),
            });
        },
    });

    const { mutate: incrementOrder, isLoading: isIncrementInputLoading } = useDefaultInputIncrementOrder({
      onError: () => {
        toastError({
          title:
           t('formBuilder:incrementErrorMessage'),
        });
      },
      onSuccess: () => {
        toastSuccess({
          title: t('common:Inputs.SuccessUpdated'),
        });
      },
    });

    const { mutate: decrementOrder, isLoading: isDecrementInputLoading } = useDefaultInputDecrementOrder({
      onError: () => {
        toastError({
          title:
            t('formBuilder:decrementErrorMessage') ,
        });
      },
      onSuccess: () => {
        toastSuccess({
          title: t('common:Inputs.SuccessUpdated'),
        });
      },
    });

    const { mutate: updateDefaultInput, isLoading: isUpdateInputLoading } = useDefaultInputUpdate(
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

    const { mutate: deleteDefaultInput, isLoading: isDeleteInputLoading } = useDefaultInputDelete(
        defaultSubCategoryId,
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

    const { mutate: changeDisplayStatus, isLoading: isChangeDisplayStatus } = useDefaultInputDisplayToClient({
        onError: (error) => {
            toastError(error?.response?.data || t('common:use.errorOccurred'));
        },
        onSuccess: () => {
            toastSuccess({
                title: t('common:Inputs.SuccessUpdated'),
            });
        },
    })

    const { defaultInputList } = useDefaultAdminInputList(defaultSubCategoryId);
    const { GetDetails } = useDefaultInputDetails();

    return (
        <Page containerSize="xl">
            <PageContent>
                <PageTopBar mb="4" w="full" showBack onBack={() => navigate(-1)}>
                    <HStack justifyContent="space-between" zIndex="99">
                        <Heading size="md">{t('common:Inputs.Title')}</Heading>
                    </HStack>
                </PageTopBar>
                <FormBuilder
                    getDetails={GetDetails}
                    isChangeDisplayStatus={isChangeDisplayStatus}
                    defaultInputList={defaultInputList}
                    createInput={createDefaultInput}
                    createInputLoading={createDefaultInputLoading}
                    updateInput={updateDefaultInput}
                    isUpdateInputLoading={isUpdateInputLoading}
                    deleteInput={deleteDefaultInput}
                    isDeleteInputLoading={isDeleteInputLoading}
                    incrementOrder={incrementOrder}
                    isIncrementInputLoading={isIncrementInputLoading}
                    decrementOrder={decrementOrder}
                    isDecrementInputLoading={isDecrementInputLoading}
                    changeDisplayStatus={changeDisplayStatus}
                />
            </PageContent>
        </Page>
    );
};

export default PageDefaultInputs;
