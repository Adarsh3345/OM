FROM public.ecr.aws/lambda/python:3.12

RUN dnf install -y gcc gcc-c++
RUN dnf install -y java-1.8.0-openjdk-devel

# Copy requirements.txt
COPY requirements.txt ${LAMBDA_TASK_ROOT}

# Copy function code
COPY lambda_function.py ${LAMBDA_TASK_ROOT}

RUN pip install -r requirements.txt

CMD ["lambda_function.handler"]