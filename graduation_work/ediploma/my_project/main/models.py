from django.db import models
from authentication.models import User
from django.core.validators import MinValueValidator, MaxValueValidator, FileExtensionValidator


class FieldOfStudy(models.Model):
    code = models.CharField(max_length=30)
    name = models.CharField(max_length=200)

    def __str__(self):
        return '{} {}'.format(self.code, self.name)


    class Meta:
        verbose_name = 'Направление подготовки / специальность'
        verbose_name_plural = 'Направления подготовки / специальности'


class Specialty(models.Model):
    code = models.CharField(max_length=30)
    name = models.CharField(max_length=200)
    field_of_study = models.ForeignKey(FieldOfStudy, on_delete=models.CASCADE, verbose_name="направление подготовки")

    def __str__(self):
        return '{} {}'.format(self.code, self.name)

    class Meta:
        verbose_name = 'Профиль / специализация'
        verbose_name_plural = 'Профили / специализации'

class Group(models.Model):
    name = models.CharField(max_length=40, verbose_name="номер группы")
    specialty = models.ForeignKey(Specialty, on_delete=models.CASCADE, verbose_name="специальность", default=1)
    course_number = models.PositiveSmallIntegerField(blank=True, null=True, verbose_name="номер курса")

    def __str__(self):
        return '{}'.format(self.name)

    class Meta:
        verbose_name = 'Учебная группа'
        verbose_name_plural = 'Учебные группы'


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, related_name="user_student")
    record_book_number = models.CharField(max_length=20, blank=True, null=True, verbose_name="номер зачетки")
    access_contacts_agree = models.BooleanField(default=False, verbose_name="согласие на публикацию контактов")
    group = models.ForeignKey(Group, on_delete=models.CASCADE, verbose_name="учебная группа")
    average_score = models.FloatField(default=0.0, verbose_name="средний балл",
                                      validators=[MinValueValidator(0.0), MaxValueValidator(5.0)])
    notification_order = models.BooleanField(default=False, verbose_name="уведомление о выходе приказов")
    notification_schedule = models.BooleanField(default=False, verbose_name="уведомление о графике работы")
    notification_protection = models.BooleanField(default=False, verbose_name="уведомление о защите")
    BASIS_OF_STUDY_CHOICES = (
        ('за счет бюджетных ассигнований федерального бюджета', 'за счет бюджетных ассигнований федерального бюджета'),
        ('на условиях договора об оказании платных образовательных услуг', 'на условиях договора об оказании платных образовательных услуг'),
    )
    basis_of_study = models.CharField(max_length=100, blank=True, null=True,
                                      choices=BASIS_OF_STUDY_CHOICES, verbose_name="основа обучения")
    date_of_birth = models.DateField(blank=True, null=True)
    year_of_prev_education_completion = models.PositiveSmallIntegerField(blank=True, null=True,
                                                                         verbose_name="год окончания предыдущего образования")
    form_of_prev_education = models.CharField(max_length=200, blank=True, null=True,
                                              verbose_name="форма предыдущего образования")
    year_of_admission = models.PositiveSmallIntegerField(blank=True, null=True, verbose_name="год поступления")
    special_marks = models.TextField(blank=True, null=True, verbose_name="особые отметки")
    number_of_debts = models.PositiveSmallIntegerField(blank=True, null=True, verbose_name="количество долгов")
    certificate_of_curriculum_completion = models.DateField(blank=True, null=True,
                                                            verbose_name="справка о выполнении учебного плана")
    record_book_submitted = models.BooleanField(default=False, verbose_name="сдана зачетка")
    diploma_with_honors = models.BooleanField(default=False, verbose_name="диплом с отличием")
    application_for_postgraduate_leave = models.BooleanField(default=False,
                                                             verbose_name="заявление на последипломный отпуск")
    recommended_for_admission = models.CharField(max_length=100, blank=True, null=True,
                                                 verbose_name="рекомендован к поступлению")
    group_leader = models.BooleanField(default=False, verbose_name="староста")
    LEVEL_OF_EDUCATION_CHOICES = (
        ('бакалавриат', 'бакалавриат'),
        ('магистратура', 'магистратура'),
    )
    level_of_education = models.CharField(max_length=100, blank=True, null=True,
                                          choices=LEVEL_OF_EDUCATION_CHOICES, verbose_name="уровень образования")
    number_of_requests = models.PositiveSmallIntegerField(blank=True, null=True,
                                                                         verbose_name="количество поданных заявок")
    FORM_OF_EDUCATION_CHOICES = (
        ('очная', 'очная'),
        ('очно-заочная', 'очно-заочная'),
        ('заочная', 'заочная'),
    )
    form_of_education = models.CharField(max_length=100, blank=True, null=True,
                                          choices=FORM_OF_EDUCATION_CHOICES, verbose_name="форма образования")


    def __str__(self):
        return '{}'.format(self.user)

    class Meta:
        verbose_name = 'Выпускник'
        verbose_name_plural = 'Выпускники'


class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, related_name="user_teacher")
    number_of_vacancies = models.PositiveSmallIntegerField(blank=True, null=True,
                                                           verbose_name="количество вакантных мест")
    additional_information = models.TextField(blank=True, null=True, verbose_name="дополнительная информация")
    notification_order = models.BooleanField(default=False, verbose_name="уведомление о выходе приказов")
    notification_schedule = models.BooleanField(default=False, verbose_name="уведомление о графике работы")
    notification_protection = models.BooleanField(default=False, verbose_name="уведомление о защите")

    def __str__(self):
        return '{}'.format(self.user)

    class Meta:
        verbose_name = 'Руководитель'
        verbose_name_plural = 'Руководители'


class EmployeeInformation(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    job_title = models.CharField(max_length=200, blank=True, null=True, verbose_name="должность")
    academic_title = models.CharField(max_length=200, blank=True, null=True, verbose_name="ученое звание")
    academic_degree = models.CharField(max_length=200, blank=True, null=True, verbose_name="ученая степень")
    place_of_work = models.CharField(max_length=200, blank=True, null=True, verbose_name="место работы")

    class Meta:
        verbose_name = 'Рабочая информация'
        verbose_name_plural = 'Рабочая информация'

    def __str__(self):
        return '{}'.format(self.user)


class Company(models.Model):
    name = models.CharField(max_length=200)
    first_name_of_responsible = models.CharField(max_length=100, blank=True, null=True,
                                                 verbose_name="имя ответственного")
    last_name_of_responsible = models.CharField(max_length=100, blank=True, null=True,
                                                verbose_name="фамилия ответственного")
    patronymic_of_responsible = models.CharField(max_length=100, blank=True, null=True,
                                                 verbose_name="отчество ответственного")
    job_title_of_responsible = models.CharField(max_length=100, blank=True, null=True,
                                                verbose_name="должность ответственного")
    additional_information = models.TextField(blank=True, null=True, verbose_name="дополнительная информация")

    class Meta:
        verbose_name = 'Организация'
        verbose_name_plural = 'Организации'

    def __str__(self):
        return '{}'.format(self.name)


class Theme(models.Model):
    name = models.CharField(max_length=200)
    reviewer = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True,
                                 verbose_name="рецензент", related_name="theme_reviewer")
    teacher = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True,
                                verbose_name="принадлежность к руководителю", related_name="theme_teacher")
    department = models.CharField(max_length=200, blank=True, null=True, verbose_name="принадлежность к кафедре")
    company = models.ForeignKey(Company, on_delete=models.SET_NULL, blank=True, null=True, verbose_name="принадлежность к компании")
    fqw_by_application = models.CharField(max_length=200, blank=True, null=True, verbose_name="вкр по заявке")
    free = models.BooleanField(default=True, verbose_name="тема свободна")
    by_student = models.BooleanField(default=False, verbose_name="предложена выпускником")

    def __str__(self):
        return '{}'.format(self.name)

    class Meta:
        verbose_name = 'Тема'
        verbose_name_plural = 'Темы'


class Request(models.Model):
    student = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name="выпускник")
    teacher = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True,
                                verbose_name="руководитель", related_name="request_teacher")
    consultant = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True,
                                   verbose_name="консультант", related_name="request_consultant")
    theme = models.OneToOneField(Theme, on_delete=models.SET_NULL, blank=True, null=True, verbose_name="тема из списка")
    theme_str = models.CharField(max_length=300, blank=True, null=True, verbose_name="собственная тема")
    is_accepted_theme = models.BooleanField(blank=True, null=True, verbose_name="тема подтверждена")
    is_accepted_request = models.BooleanField(blank=True, null=True, verbose_name="заявка подтверждена")
    explanatory_note_submitted = models.BooleanField(default=False, verbose_name="сдана пояснительная записка")
    publication_agree = models.BooleanField(default=False, verbose_name="согласие на публикацию")
    teacher_review = models.PositiveSmallIntegerField(blank=True, null=True, verbose_name="отзыв оценка")
    review = models.PositiveSmallIntegerField(blank=True, null=True, verbose_name="рецензия оценка")
    implementation_act = models.BooleanField(default=False, verbose_name="акт внедрения")
    plagiarism_report = models.PositiveSmallIntegerField(blank=True, null=True, verbose_name="антиплагиат %")
    type_of_fqw = models.CharField(max_length=200, blank=True, null=True, verbose_name="вид вкр")
    fqw_in_english = models.BooleanField(default=False, verbose_name="вкр на английском")
    fqw_recommended = models.CharField(max_length=200, blank=True, null=True, verbose_name="вкр рекомендована")
    special_conditions = models.CharField(max_length=200, blank=True, null=True, verbose_name="специальные условия")
    preprotection_grade = models.PositiveSmallIntegerField(blank=True, null=True, verbose_name="оценка на предзащите")
    additional_information = models.TextField(blank=True, null=True, verbose_name="дополнительная информация")

    def __str__(self):
        return '{} {} {}'.format(self.student, self.teacher, self.theme)

    class Meta:
        verbose_name = 'Заявка'
        verbose_name_plural = 'Заявки'


class WorkProtection(models.Model):
    date = models.DateField(blank=True, null=True)
    venue_number = models.PositiveSmallIntegerField(blank=True, null=True, verbose_name="номер пункта проведения")
    audience_number = models.CharField(max_length=100, blank=True, null=True, verbose_name="аудитория")
    group = models.ForeignKey(Group, on_delete=models.CASCADE, verbose_name="учебная группа")
    additional_information = models.TextField(blank=True, null=True, verbose_name="дополнительная информация")

    def __str__(self):
        return '{} {}'.format(self.date, self.group)

    class Meta:
        verbose_name = 'Общая защита работы'
        verbose_name_plural = 'Общая защита работы'


class PersonalWorkProtection(models.Model):
    request = models.OneToOneField(Request, on_delete=models.CASCADE, verbose_name="заявка")
    work_protection = models.ForeignKey(WorkProtection, on_delete=models.CASCADE, verbose_name="общая защита")
    personal_time = models.TimeField(blank=True, null=True)
    serial_number = models.PositiveSmallIntegerField(blank=True, null=True,
                                                     verbose_name="порядковый номер выступающего")
    final_grade = models.PositiveSmallIntegerField(blank=True, null=True, verbose_name="итоговая оценка")
    protocol_number = models.PositiveSmallIntegerField(blank=True, null=True, verbose_name="номер протокола")
    additional_information = models.TextField(blank=True, null=True, verbose_name="дополнительная информация")

    def __str__(self):
        return '{}'.format(self.request)

    class Meta:
        verbose_name = 'Индивидуальная защита работы'
        verbose_name_plural = 'Индивидуальная защита работы'


class WorkSchedule(models.Model):
    request = models.ForeignKey(Request, on_delete=models.CASCADE, verbose_name="заявка")
    stage_name = models.CharField(max_length=200, verbose_name="название этапа")
    start = models.DateField(blank=True, null=True, verbose_name="начало этапа")
    end = models.DateField(verbose_name="конец этапа")
    result = models.CharField(max_length=200, blank=True, null=True, verbose_name="результат выполнения этапа")
    completion_mark = models.BooleanField(blank=True, null=True, verbose_name="отметка о выполнении")
    absence = models.BooleanField(blank=False, null=True, verbose_name="неявка")

    def __str__(self):
        return '{}'.format(self.request)

    class Meta:
        verbose_name = 'График работы'
        verbose_name_plural = 'Графики работ'

class FileOrder(models.Model):
    name = models.CharField(max_length=200)
    file = models.FileField(validators=[
        FileExtensionValidator(allowed_extensions=['pdf', 'doc', 'docx',])])

    def __str__(self):
        return '{}'.format(self.name)

    class Meta:
        verbose_name = 'Файл приказа'
        verbose_name_plural = 'Файлы приказов'

class TypeOfOrder(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return '{}'.format(self.name)

    class Meta:
        verbose_name = 'Тип приказа'
        verbose_name_plural = 'Типы приказов'


class Order(models.Model):
    order_number = models.CharField(max_length=100, verbose_name="номер приказа")
    date = models.DateField()
    order_point = models.PositiveSmallIntegerField(blank=True, null=True, verbose_name="пункт приказа")
    additional_information = models.TextField(blank=True, null=True, verbose_name="дополнительная информация")
    student = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="выпускник")
    type_of_order = models.ForeignKey(TypeOfOrder, on_delete=models.SET_NULL,  blank=True, null=True, verbose_name="тип приказа")
    file = models.ForeignKey(FileOrder, on_delete=models.CASCADE, blank=True, null=True, verbose_name="файл приказа")

    class Meta:
        verbose_name = 'Приказ'
        verbose_name_plural = 'Приказы'

    def __str__(self):
        return '{} {} {}'.format(self.date, self.type_of_order, self.student)


class CompositionOfSEC(models.Model):
    member_of_SEC = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_composition_of_SEC")
    year = models.PositiveSmallIntegerField(blank=True, null=True, verbose_name="год проведения")
    chairman_of_SEC = models.BooleanField(default=False, verbose_name="председатель ГЭК")

    def __str__(self):
        return '{}'.format(self.member_of_SEC)

    class Meta:
        verbose_name = 'Состав ГЭК'
        verbose_name_plural = 'Составы ГЭК'


