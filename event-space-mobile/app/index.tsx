import { StyledText } from '@/src/components/ui';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { UserLoginDto } from '@/src/api/auth/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema } from '@/src/schemas/login-form-schema';
import { LoginForm } from '@/src/components/shared/auth';
import { MainLayout } from '@/src/hoc';

export default function Index() {
  const loginForm = useForm<UserLoginDto>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });

  const onSubmit = (data: UserLoginDto) => {
    console.log(data);
  };

  return (
    <MainLayout className={'flex-1 justify-center items-center gap-5'}>
      <StyledText className={'text-4xl font-medium'}>EventSpace</StyledText>
      <View className={''}>
        <StyledText className={'text-muted-foreground text-center'}>
          Добро пожаловать!
        </StyledText>
        <StyledText className={'text-muted-foreground text-center'}>
          Пожалуйста, введите свои данные.
        </StyledText>
      </View>
      <LoginForm form={loginForm} onSubmit={onSubmit}/>
    </MainLayout>
  );
}
