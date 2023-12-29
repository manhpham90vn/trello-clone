FROM mcr.microsoft.com/devcontainers/base:ubuntu-22.04

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION=v21.5.0

RUN mkdir -p ${NVM_DIR} \
    && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

ENV NODE_PATH $NVM_DIR/versions/node/$NODE_VERSION/bin
ENV PATH $NODE_PATH:$PATH

RUN npm install -g yarn

CMD exec /bin/bash -c "trap : TERM INT; sleep infinity & wait"