import { FormBuilder } from "@/components/FormBuilder"
import { useToastError, useToastSuccess } from "@/components/Toast"
import { Page, PageContent, PageTopBar } from "@/spa/layout"
import { HStack, Heading } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"
import {  useDefaultInputCreate, useDefaultInputDecrementOrder, useDefaultInputDelete, useDefaultInputDetails, useDefaultInputDisplayToClient, useDefaultInputIncrementOrder, useDefaultInputList, useDefaultInputUpdate } from "./DefaultInputs.service"

const PageDefaultInputs = () => {
  const { defaultSubCategoryId } = useParams();
  const toastError = useToastError();
  const toastSuccess = useToastSuccess();
  const navigate = useNavigate();
  const { t } = useTranslation(['common']);

  const { mutate: createDefaultInput, isLoading: createDefaultInputLoading } = useDefaultInputCreate(defaultSubCategoryId,
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

  const { defaultInputList } = useDefaultInputList(defaultSubCategoryId);

  const { mutate: changeDefaultDisplayStatus, isLoading: isChangeDefaultDisplayStatus } = useDefaultInputDisplayToClient({
    onError: (error) => {
      toastError(error?.response?.data || t('common:use.errorOccurred'));
    },
    onSuccess: () => {
      toastSuccess({
        title: t('common:Inputs.SuccessUpdated'),
      });
    },
  })

  const { mutate: incrementOrder, isLoading: isIncrementInputLoading } = useDefaultInputIncrementOrder({
    onError: (error) => {
      toastError(error?.response?.data || t('common:use.errorOccurred'));
    },
    onSuccess: () => {
      toastSuccess({
        title: t('common:Inputs.SuccessUpdated'),
      });
    },
  });

  const { mutate: decrementOrder, isLoading: isDecrementInputLoading } = useDefaultInputDecrementOrder({
    onError: (error) => {
      toastError(error?.response?.data || t('common:use.errorOccurred'));
    },
    onSuccess: () => {
      toastSuccess({
        title: t('common:Inputs.SuccessUpdated'),
      });
    },
  });

  const { mutate: deleteDefaultInput, isLoading: isDeleteDefaultInputLoading } = useDefaultInputDelete(
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

  const { mutate: updateDefaultInput, isLoading: isUpdateDefaultInputLoading } = useDefaultInputUpdate(
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
          isChangeDisplayStatus={isChangeDefaultDisplayStatus}
          isDecrementInputLoading={isDecrementInputLoading}
          isDeleteInputLoading={isDeleteDefaultInputLoading}
          isIncrementInputLoading={isIncrementInputLoading}
          isUpdateInputLoading={isUpdateDefaultInputLoading}
          updateInput={updateDefaultInput}
          deleteInput={deleteDefaultInput}
          decrementOrder={decrementOrder}
          incrementOrder={incrementOrder}
          changeDisplayStatus={changeDefaultDisplayStatus}
          defaultInputList={defaultInputList}
          createInput={createDefaultInput}
          createInputLoading={createDefaultInputLoading}
        />
      </PageContent>
    </Page>
  )
}
export default PageDefaultInputs