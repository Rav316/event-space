import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader, Spinner
} from '@/components/ui';
import { ArrowLeft, ArrowRight, Calendar, UserPlus } from 'lucide-react';
import { Link } from 'react-router';
import {
  StepPersonalData,
  StepRoleStatus,
  StepSecurity,
} from '@/components/shared/registration';
import { registrationSteps } from '@/constants/registration-steps.ts';
import { useRegistrationStore } from '@/store/use-registration-store.ts';
import { useStepper } from '@/hooks/use-stepper.ts';
import { useRegistrationForms } from '@/hooks/use-registration-forms.ts';
import { useRegistration } from '@/api/auth/hooks.ts';
import { RegistrationStepper } from '@/components/shared';

const RegistrationPage = () => {
  const { currentStep, next, back } = useStepper(3);

  const registrationData = useRegistrationStore(
    (state) => state.registrationData,
  );

  const setRegistrationData = useRegistrationStore(
    (state) => state.setRegistrationData,
  );

  const registrationMutation = useRegistration();

  const { personalDataForm, roleStatusForm, passwordCreateForm } =
    useRegistrationForms();

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <StepPersonalData form={personalDataForm} />;
      case 1:
        return <StepRoleStatus form={roleStatusForm} />;
      case 2:
        return <StepSecurity form={passwordCreateForm} />;
      default:
        return null;
    }
  };

  const onStepNext = () => {
    switch (currentStep) {
      case 0:
        setRegistrationData(personalDataForm.getValues());
        break;
      case 1:
        setRegistrationData(roleStatusForm.getValues());
        break;
      case 2:
        setRegistrationData(passwordCreateForm.getValues())
        registrationMutation.mutate({
          ...registrationData,
          password: passwordCreateForm.getValues().password,
        });
        break;
    }
    next();
  };

  const onStepBack = () => {
    back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-primary"
          >
            <Calendar className="h-8 w-8" />
            <span className="text-2xl font-bold">EventSpace</span>
          </Link>
          <p className="text-muted-foreground mt-2">
            Присоединяйтесь к нашему сообществу
          </p>
        </div>

        <RegistrationStepper
          steps={registrationSteps}
          currentStep={currentStep}
        />

        <Card className="backdrop-blur-sm bg-card/80 border border-border/50 shadow-xl">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center space-x-2">
              <Badge variant="outline" className="px-3 py-1">
                Шаг {currentStep + 1} из 3
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="px-8">
            {renderStepContent()}
            <div className="flex justify-between pt-6 mt-6 border-t border-border/50">
              <Button
                disabled={currentStep === 0}
                variant="outline"
                className="flex items-center space-x-2"
                onClick={onStepBack}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Назад</span>
              </Button>
              {currentStep === 0 ? (
                <Button onClick={personalDataForm.handleSubmit(onStepNext)}>
                  <span>Далее</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : currentStep === 1 ? (
                <Button onClick={roleStatusForm.handleSubmit(onStepNext)}>
                  <span>Далее</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <>
                  {registrationMutation.isPending ? (
                    <Button>
                      <Spinner/>
                      <span>Регистрируем...</span>
                    </Button>
                  ) : (
                    <Button
                      className="flex items-center space-x-2"
                      onClick={passwordCreateForm.handleSubmit(onStepNext)}
                    >
                      <UserPlus className="h-4 w-4" />
                      <span>Создать аккаунт</span>
                    </Button>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>
        <div className="text-center space-y-4">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
