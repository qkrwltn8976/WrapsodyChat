package com.wrapsody.messaging.config;

import java.util.Locale;

public class Constant {

    // config keys
    public static final String organUUID = "organ.uuid";
    public static final String organUpdate = "organ.update";
    public static final String botEnabled = "bot.enabled";

    public static final Locale defaultLocale = Locale.KOREA;

    public static final int messagesPerRequest = 20;

    public static final String systemMessageUserId = "@SYS@";
    public static final String systemMessageDelimiter = "//";

    public static final String mentionPrefix = "@";

    public static final String botPrefix = "@BOT@";
    public static final String botWrapsodyUserId = botPrefix + "wrapsody";

    public static final String exchangeRequest = "request";
    public static final String exchangeEvent = "event";
    public static final String exchangeChat = "chat";

    public static final String exchangeRoom = "room";
    public static final String exchangeUser = "user";
    public static final String exchangeDept = "dept";

    public static final String exchangeWrapsodyEvent = "event-wrapsody";
    public static final String exchangeRabbitMQEvent = "amq.rabbitmq.event";

    public static final String queueApi = "request-api";
    public static final String queueChat = "request-chat";
    public static final String queueEvent = "request-event";

    public static final String queueDeadLetter = "module-dead-letter";
    public static final String queueFPNS = "module-fpns";

    public static final String queueWrapsodyEvent = "event-messaging";
    public static final String queueRabbitMQEvent = "event-rabbitmq";

    public static final String fpnsDelimiter = "%%%";
    public static final String fpnsDetailChatMessage = "CHAT_MESSAGE";
    public static final String fpnsDetailChatDocRoomMessage = "CHAT_DOCROOM_MESSAGE";

    public static final String[] allowedConversationProperties = {"bookmark", "deadline"};
}