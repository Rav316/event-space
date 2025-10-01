export const SpacesNotFound = () => {
  return (
    <div className={'flex flex-col h-[250px] items-center justify-center'}>
      <span className={'font-medium text-xl text-center'}>
        По заданным фильтрам помещений не найдено
      </span>
      <p className={'text-muted-foreground text-center'}>
        Попробуйте изменить или убрать параметры фильтрации
      </p>
    </div>
  );
};
